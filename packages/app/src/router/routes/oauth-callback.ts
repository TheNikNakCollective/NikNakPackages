import express from 'express'
import { handler } from '../handler'
import { AppContext } from '@app/context'
import { getIronSession } from 'iron-session'
import { Session } from '../session'
import assert from 'node:assert'
import { env } from '@app/env'

export function oauthCallback(router: express.Router, ctx: AppContext) {
    router.get(
        '/oauth/callback',
        handler(async function oauthCallback(req, res) {
            const params = new URLSearchParams(req.originalUrl.split('?')[1])
            const redirectUri = `niknak://oauth/callback`

            ctx.logger.info(params, 'params')

            try {
                const { session } = await ctx.oauthClient.callback(params)

                const clientSession = await getIronSession<Session>(req, res, {
                    cookieName: 'niknak-bsky',
                    password: env.COOKIE_SECRET,
                })

                assert(!clientSession.did, 'session already exists')

                clientSession.did = session.did

                await clientSession.save()

                return res.redirect(
                    `${redirectUri}?success=true&did=${clientSession.did}`
                )
            } catch (err) {
                ctx.logger.error({ err }, 'oauth callback failed')

                return res.redirect(
                    `${redirectUri}?error=${encodeURIComponent((err as Error).message)}`
                )
            }
        })
    )
}
