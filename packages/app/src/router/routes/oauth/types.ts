import { ProfileViewDetailed } from '@atproto/api/dist/client/types/app/bsky/actor/defs'

export type LoginURL = {
    url: string
}

export type LogoutResponse = {
    message: string
}

export type UserInfo = ProfileViewDetailed
