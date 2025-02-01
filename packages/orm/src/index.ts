import 'reflect-metadata'
import { Profile } from './repositories/profile'
import { Post } from './repositories/post'
import { Video } from './repositories/video'
import { Caption } from './repositories/caption'
import { AuthSession } from './repositories/auth-session'
import { AuthState } from './repositories/auth-state'

export type { NikNakDatabase } from './database'
export { createDatabase } from './database'

export const entities = [Profile, AuthSession, AuthState, Post, Video, Caption]

export { Profile, AuthSession, AuthState, Post, Video, Caption }
