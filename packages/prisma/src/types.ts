import * as ComAtprotoRepoStrongRef from '@niknak/lexicon/lexicon/types/com/atproto/repo/strongRef'
import * as ProfileLexicon from '@niknak/lexicon/lexicon/types/app/bsky/actor/profile'
import * as PostLexicon from '@niknak/lexicon/lexicon/types/app/bsky/feed/post'
import * as AtProtoOauthNodeClient from '@atproto/oauth-client-node'

declare global {
    namespace PrismaJson {
        export type ComAtprotoRepoStrongRefMain = ComAtprotoRepoStrongRef.Main
        export type ProfileLabels = ProfileLexicon.Record['labels']
        export type PostLabels = PostLexicon.Record['labels']
        export type NodeSavedSession = AtProtoOauthNodeClient.NodeSavedSession
        export type NodeSavedState = AtProtoOauthNodeClient.NodeSavedState
    }
}
