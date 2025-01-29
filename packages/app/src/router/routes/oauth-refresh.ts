import express from 'express'
import { handler } from '../handler'
import { AppContext } from '@app/context'
import { getSessionAgent } from '../session'

export function oauthRefresh(router: express.Router, ctx: AppContext) {
    router.get(
        '/oauth/refresh',
        handler(async function oauthRefresh(req, res) {
            const agent = await getSessionAgent(req, res, ctx)

            try {
                const did = agent?.assertDid

                if (did) {
                    res.status(200).send('Authorized')
                } else {
                    throw new Error('Not Authorized')
                }
            } catch (error) {
                res.status(403).send('Not Authorized')
            }
        })
    )
}
