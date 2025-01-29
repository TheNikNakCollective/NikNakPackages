import { env } from '@app/env'
import { getIronSession } from 'iron-session'
import { Agent } from '@atproto/api'
import type { IncomingMessage, ServerResponse } from 'node:http'
import { AppContext } from '@app/context'

export type Session = { did: string }

export async function getSessionAgent(
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage>,
    ctx: AppContext
) {
    const session = await getIronSession<Session>(req, res, {
        cookieName: 'niknak-bsky',
        password: env.COOKIE_SECRET,
    })

    if (!session.did) return null

    try {
        const oauthSession = await ctx.oauthClient.restore(session.did)

        return oauthSession ? new Agent(oauthSession) : null
    } catch (err) {
        ctx.logger.warn({ err }, 'oauth restore failed')

        session.destroy()

        return null
    }
}
