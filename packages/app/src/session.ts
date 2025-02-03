import { Agent } from '@atproto/api'
import type { IncomingMessage } from 'node:http'
import { AppContext } from '@app/context'
import { SessionManager } from '@atproto/api/dist/session-manager'
import { Prisma } from '@niknak/prisma'

export type Session = { did: string }

class NikNakAgent extends Agent {
    profile: Prisma.Profile | null

    constructor(
        options: string | URL | SessionManager,
        profile: Prisma.Profile | null
    ) {
        super(options)

        this.profile = profile
    }
}

export async function getSessionAgent(req: IncomingMessage, ctx: AppContext) {
    const authorization = req.headers['authorization']

    if (!authorization || !authorization.startsWith('Bearer ')) {
        ctx.logger.warn('No Authorization header provided')
        return null
    }

    const token = authorization.split(' ')[1]

    if (!token) return null

    try {
        const oauthSession = await ctx.oauthClient.restore(token)

        if (oauthSession) {
            const profile = await ctx.db.profile.findFirst({
                where: { did: token },
            })

            return new NikNakAgent(oauthSession, profile)
        }

        return null
    } catch (err) {
        ctx.logger.warn({ err }, 'oauth restore failed')

        await ctx.oauthClient.revoke(token)

        return null
    }
}
