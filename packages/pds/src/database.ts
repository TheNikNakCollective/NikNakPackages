import * as Profile from '@niknak/lexicon/lexicon/types/app/bsky/actor/profile'

export interface Repository<R extends Record<string, unknown>> {
    create(profile: R): Promise<R>
    update(profile: R): Promise<R>
    upsert(profile: R): Promise<R>
    delete(key: string): Promise<void>
    findUnique(key: string): Promise<R>
}

export interface ProfileRepository extends Repository<Profile.Record> {}

export interface AuthSessionRepository
    extends Repository<{ key: string; session: string }> {}

export interface AuthStateRepository
    extends Repository<{ key: string; state: string }> {}

export interface Database {
    profile: ProfileRepository
    authSession: AuthSessionRepository
    authState: AuthStateRepository
}
