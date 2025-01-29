import express from 'express'
import { handler } from '../handler'
import { AppContext } from '@app/context'
import { getSessionAgent } from '../session'

export function me(router: express.Router, ctx: AppContext) {
    router.get(
        '/me',
        handler(async function me(req, res) {
            const agent = await getSessionAgent(req, res, ctx)

            const did = agent?.assertDid;

            if (!agent || !did) {
                res.status(404).send('Not Found')
            } else {
                const profile = await agent.getProfile({ actor: did })

                const profile2 = await agent.com.atproto.sync.getRecord({
                    did,
                    collection: 'app.bsky.actor.profile',
                    rkey: "self"
                })

                console.log(profile2);

                return res.status(200).json(profile.data)
            }
        })
    )
}
