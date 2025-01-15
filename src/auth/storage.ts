import { Database } from "@app/database";
import type {
  NodeSavedSession,
  NodeSavedSessionStore,
  NodeSavedState,
  NodeSavedStateStore,
} from "@atproto/oauth-client-node";

export class StateStore implements NodeSavedStateStore {
  constructor(private db: Database) {}

  async get(key: string): Promise<NodeSavedState | undefined> {
    const result = await this.db.authState.findUnique(key);
   
    if (!result) return;

    return JSON.parse(result.state) as NodeSavedState;
  }

  async set(key: string, val: NodeSavedState) {
    const state = JSON.stringify(val);

    await this.db.authState.upsert({key, state })
  }

  async del(key: string) {
    await this.db.authState.delete(key)
  }
}

export class SessionStore implements NodeSavedSessionStore {
  constructor(private db: Database) {}

  async get(key: string): Promise<NodeSavedSession | undefined> {
    const result = await this.db.authSession.findUnique(key);

    if (!result) return;

    return JSON.parse(result.session) as NodeSavedSession;
  }

  async set(key: string, val: NodeSavedSession) {
    const session = JSON.stringify(val);

    await this.db.authSession.upsert({ key, session })
  }

  async del(key: string) {
    await this.db.authSession.delete(key)
  }
}
