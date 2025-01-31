import 'reflect-metadata'
import { Profile } from './repositories/profile'
import { AuthSession } from './repositories/auth-session'
import { AuthState } from './repositories/auth-state'

export type { NikNakDatabase } from './database'
export { createDatabase } from './database'

export const entities = [Profile, AuthSession, AuthState]

export { Profile, AuthSession, AuthState }
