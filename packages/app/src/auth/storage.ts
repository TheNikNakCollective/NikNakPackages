import type {
    NodeSavedSession,
    NodeSavedSessionStore,
    NodeSavedState,
    NodeSavedStateStore,
} from '@atproto/oauth-client-node'
import prisma from '@niknak/prisma'

export class StateStore implements NodeSavedStateStore {
    constructor(private db: typeof prisma) {}

    async get(key: string): Promise<NodeSavedState | undefined> {
        const result = await this.db.authState.findUnique({
            where: { key },
        })

        if (!result) return

        return result.state
    }

    async set(key: string, val: NodeSavedState) {
        await this.db.authState.upsert({
            where: { key },
            create: { key, state: val },
            update: { key, state: val },
        })
    }

    async del(key: string) {
        await this.db.authState.delete({ where: { key } })
    }
}

export class SessionStore implements NodeSavedSessionStore {
    constructor(private db: typeof prisma) {}

    async get(key: string): Promise<NodeSavedSession | undefined> {
        const result = await this.db.authSession.findUnique({ where: { key } })

        if (!result) return

        return result.session
    }

    async set(key: string, val: NodeSavedSession) {
        await this.db.authSession.upsert({
            where: { key },
            create: { key, session: val },
            update: { key, session: val },
        })
    }

    async del(key: string) {
        await this.db.authSession.delete({ where: { key } })
    }
}
