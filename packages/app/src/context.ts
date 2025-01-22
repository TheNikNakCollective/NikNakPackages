import { OAuthClient } from '@atproto/oauth-client-node'
import { BidirectionalResolver } from './id-resolver'
import { Ingestors } from './ingestors'
import { NikNakDatabase } from '@niknak/orm'

export type AppContext = {
    db: NikNakDatabase
    // ingestors: Ingestors
    logger: Console
    oauthClient: OAuthClient
    resolver: BidirectionalResolver
}
