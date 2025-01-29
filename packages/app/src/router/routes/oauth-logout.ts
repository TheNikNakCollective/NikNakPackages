import express from 'express'
import { handler } from '../handler'
import { AppContext } from '@app/context'
import { getSessionAgent } from '../session'

export function oauthLogout(router: express.Router, ctx: AppContext) {
    router.post(
        '/oauth/logout',
        handler(async function oauthLogout(req, res) {
            const agent = await getSessionAgent(req, res, ctx)

            if (agent) {
                await ctx.oauthClient.revoke(agent.assertDid)

                return res.status(200).json({ success: true })
            }
            else {
                throw new Error('No session found');
            }
        })
    )
}
