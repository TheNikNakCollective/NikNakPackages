import { OAuthClient } from '@atproto/oauth-client-node'
import { BidirectionalResolver } from '@niknak/id-resolver'
import { NikNakDatabase } from '@niknak/orm'

export type AppContext = {
    db: NikNakDatabase
    logger: Console
    oauthClient: OAuthClient
    resolver: BidirectionalResolver
}
