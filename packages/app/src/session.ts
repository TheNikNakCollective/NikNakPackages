import { Agent } from '@atproto/api'
import type { IncomingMessage } from 'node:http'
import { AppContext } from '@app/context'

export type Session = { did: string }

export async function getSessionAgent(
    req: IncomingMessage,
    ctx: AppContext
) {
    const authorization = req.headers['authorization']

    if (!authorization || !authorization.startsWith('Bearer ')) {
        ctx.logger.warn('No Authorization header provided')
        return null
    }

    const token = authorization.split(' ')[1]

    if (!token) return null

    try {
        const oauthSession = await ctx.oauthClient.restore(token)

        return oauthSession ? new Agent(oauthSession) : null
    } catch (err) {
        ctx.logger.warn({ err }, 'oauth restore failed')

        await ctx.oauthClient.revoke(token)

        return null
    }
}
