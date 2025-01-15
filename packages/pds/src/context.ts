import { Database } from './database'
import pino from 'pino'
import { OAuthClient } from '@atproto/oauth-client-node'
import { BidirectionalResolver } from './id-resolver'
import { Ingestors } from './ingestors'

export type AppContext = {
    db: Database
    ingestors: Ingestors
    logger: pino.Logger
    oauthClient: OAuthClient
    resolver: BidirectionalResolver
}
