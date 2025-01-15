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

        if (!result) return

        return result.state
    }

    async set(key: string, val: NodeSavedState) {
        await this.db.authState.save({ key, state: val })
    }

    async del(key: string) {
        await this.db.authState.delete(key)
    }
}

export class SessionStore implements NodeSavedSessionStore {
    constructor(private db: NikNakDatabase) {}

    async get(key: string): Promise<NodeSavedSession | undefined> {
        const result = await this.db.authSession.findOneBy({ key })

        if (!result) return

        return result.session
    }

    async set(key: string, val: NodeSavedSession) {
        await this.db.authSession.save({ key, session: val })
    }

    async del(key: string) {
        await this.db.authSession.delete(key)
    }
}
