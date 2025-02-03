import {
    Controller,
    Get,
    Post,
    Route,
    SuccessResponse,
    Request,
    Body,
} from 'tsoa'
import { RequestWithAppContext } from '@app/context'
import { LoginBody, LoginURL, LogoutResponse } from './types'
import { getSessionAgent } from '@app/session'
import * as ProfileLexicon from '@niknak/lexicon/lexicon/types/app/bsky/actor/profile'
import { ProfileViewDetailed } from '@atproto/api/dist/client/types/app/bsky/actor/defs'
import { upsertPost, upsertProfile } from '@niknak/prisma'
import { isPost, isProfile } from '@app/utils/is'

@Route('oauth')
export class OauthController extends Controller {
    @Post('/login')
    @SuccessResponse(
        200,
        'Returns the redirect url for the user to login to blue sky'
    )
    public async login(
        @Request() req: RequestWithAppContext,
        @Body() body: LoginBody
    ): Promise<LoginURL> {
        const { handle } = body
        const url = await req.context.oauthClient.authorize(handle, {
            scope: 'atproto transition:generic',
        })

        return { url: url.toString() }
    }

    @Get('/callback')
    @SuccessResponse(302, 'Redirect')
    public async callback(
        @Request() req: RequestWithAppContext
    ): Promise<void> {
        const params = new URLSearchParams(req.originalUrl.split('?')[1])
        const redirectUri = `niknak://oauth/callback`

        try {
            const { session } = await req.context.oauthClient.callback(params)

            const { scope, sub, expiresAt } = await session.getTokenInfo()

            const tokenParams = new URLSearchParams({
                did: sub,
                scope,
                expiresAt: expiresAt?.toISOString() ?? '',
                success: 'true',
            })

            this.setHeader(
                'Location',
                `${redirectUri}?${tokenParams.toString()}`
            )
            this.setStatus(302)
        } catch (err) {
            req.context.logger.error({ err }, 'oauth callback failed')

            this.setHeader(
                'Location',
                `${redirectUri}?error=${encodeURIComponent((err as Error).message)}`
            )
            this.setStatus(302)
        }
    }

    @Post('/logout')
    @SuccessResponse(200, 'Logs the user out')
    public async logout(
        @Request() req: RequestWithAppContext
    ): Promise<LogoutResponse> {
        const agent = await getSessionAgent(req, req.context)

        if (agent) {
            await req.context.oauthClient.revoke(agent.assertDid)

            return { message: 'Logged out' }
        } else {
            throw new Error('No session found')
        }
    }

    @Get('/userinfo')
    @SuccessResponse(200, 'Get user info for authenticated user')
    public async userinfo(
        @Request() req: RequestWithAppContext
    ): Promise<ProfileViewDetailed> {
        const agent = await getSessionAgent(req, req.context)

        const did = agent?.assertDid

        if (!agent || !did) {
            throw new Error('User info not found.')
        } else {
            const record = await agent.com.atproto.repo.getRecord({
                rkey: 'self',
                collection: 'app.bsky.actor.profile',
                repo: did,
            })

            const { value } = record.data

            if (isProfile(value)) {
                await upsertProfile(record.data.uri, did, value)
            }

            const user = await req.context.db.profile.findUniqueOrThrow({
                where: { uri: record.data.uri },
            })

            const profile = await agent.getProfile({ actor: did })

            console.log(user.did);

            const response = await agent.com.atproto.repo.listRecords({
                collection: 'app.bsky.feed.post',
                repo: user.did,
            })

            await Promise.all(response.data.records.map(async (post) => {
                        if (isPost(post.value)) {
                            await upsertPost(user, post.uri, user.did, post.value);
                        }
                    }))
            

            return profile.data
        }
    }
}
