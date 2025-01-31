import {
    Controller,
    Get,
    Post,
    Route,
    SuccessResponse,
    Request,
    Res,
    TsoaResponse,
    Body,
} from 'tsoa'
import { RequestWithAppContext } from '@app/context'
import { LoginBody, LoginURL, LogoutResponse, UserInfo } from './types'
import { getSessionAgent } from '@app/session'

@Route('oauth')
export class OauthController extends Controller {
    @Post('/login')
    @SuccessResponse(
        200,
        'Returns the redirect url for the user to login to blue sky'
    )
    public async login(
        @Request() req: RequestWithAppContext,
        @Body() { handle }: LoginBody
    ): Promise<LoginURL> {
        const url = await req.context.oauthClient.authorize(handle, {
            scope: 'atproto transition:generic',
        })

        return { url: url.toString() }
    }

    @Get('/callback')
    @SuccessResponse(302, 'Redirect')
    public async callback(
        @Request() req: RequestWithAppContext,
        @Res() redirect: TsoaResponse<302, { Location: string }>
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

            return redirect(302, {
                Location: `${redirectUri}?${tokenParams.toString()}`,
            })
        } catch (err) {
            req.context.logger.error({ err }, 'oauth callback failed')

            return redirect(302, {
                Location: `${redirectUri}?error=${encodeURIComponent((err as Error).message)}`,
            })
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
    ): Promise<UserInfo> {
        const agent = await getSessionAgent(req, req.context)

        const did = agent?.assertDid

        if (!agent || !did) {
            throw new Error('User info not found.')
        } else {
            const profile = await agent.getProfile({ actor: did })

            return profile.data
        }
    }
}
