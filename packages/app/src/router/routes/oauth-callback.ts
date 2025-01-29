import express from 'express'
import { handler } from '../handler'
import { AppContext } from '@app/context'

export function oauthCallback(router: express.Router, ctx: AppContext) {
    router.get(
        '/oauth/callback',
        handler(async function oauthCallback(req, res) {
            const params = new URLSearchParams(req.originalUrl.split('?')[1])
            const redirectUri = `niknak://oauth/callback`

            try {
                const { session } = await ctx.oauthClient.callback(params)

                const { scope, sub, expiresAt } = await session.getTokenInfo()

                const tokenParams = new URLSearchParams({
                    did: sub,
                    scope,
                    expiresAt: expiresAt?.toISOString() ?? '',
                    success: 'true',
                })

                return res.redirect(`${redirectUri}?${tokenParams.toString()}`)
            } catch (err) {
                ctx.logger.error({ err }, 'oauth callback failed')

                return res.redirect(
                    `${redirectUri}?error=${encodeURIComponent((err as Error).message)}`
                )
            }
        })
    )
}
