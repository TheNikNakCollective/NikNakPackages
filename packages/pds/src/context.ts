import pino from 'pino'
import { OAuthClient } from '@atproto/oauth-client-node'
import { BidirectionalResolver } from './id-resolver'
import { Ingestors } from './ingestors'
import { NikNakDatabase } from '@niknak/orm'

export type AppContext = {
    db: NikNakDatabase
    ingestors: Ingestors
    logger: pino.Logger
    oauthClient: OAuthClient
    resolver: BidirectionalResolver
}
