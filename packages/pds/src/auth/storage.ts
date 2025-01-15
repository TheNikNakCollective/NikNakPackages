import type {
    NodeSavedSession,
    NodeSavedSessionStore,
    NodeSavedState,
    NodeSavedStateStore,
} from '@atproto/oauth-client-node'
import { NikNakDatabase } from '@niknak/orm'

export class StateStore implements NodeSavedStateStore {
    constructor(private db: NikNakDatabase) {}

    async get(key: string): Promise<NodeSavedState | undefined> {
        const result = await this.db.authState.findOneBy({ key })

        if (!result || !result.state) return

        return JSON.parse(result.state) as NodeSavedState
    }

    async set(key: string, val: NodeSavedState) {
        const state = JSON.stringify(val)

        await this.db.authState.save({ key, state })
    }

    async del(key: string) {
        await this.db.authState.delete(key)
    }
}

export class SessionStore implements NodeSavedSessionStore {
    constructor(private db: NikNakDatabase) {}

    async get(key: string): Promise<NodeSavedSession | undefined> {
        const result = await this.db.authSession.findOneBy({ key })

        if (!result || !result.session) return

        return JSON.parse(result.session) as NodeSavedSession
    }

    async set(key: string, val: NodeSavedSession) {
        const session = JSON.stringify(val)

        await this.db.authSession.save({ key, session })
    }

    async del(key: string) {
        await this.db.authSession.delete(key)
    }
}
