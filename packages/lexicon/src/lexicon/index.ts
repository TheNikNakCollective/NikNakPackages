/**
 * GENERATED CODE - DO NOT MODIFY
 */
import {
  createServer as createXrpcServer,
  Server as XrpcServer,
  Options as XrpcOptions,
  AuthVerifier,
  StreamAuthVerifier,
} from '@atproto/xrpc-server'
import { schemas } from './lexicons'

export const APP_BSKY_FEED = {
  DefsRequestLess: 'app.bsky.feed.defs#requestLess',
  DefsRequestMore: 'app.bsky.feed.defs#requestMore',
  DefsClickthroughItem: 'app.bsky.feed.defs#clickthroughItem',
  DefsClickthroughAuthor: 'app.bsky.feed.defs#clickthroughAuthor',
  DefsClickthroughReposter: 'app.bsky.feed.defs#clickthroughReposter',
  DefsClickthroughEmbed: 'app.bsky.feed.defs#clickthroughEmbed',
  DefsContentModeUnspecified: 'app.bsky.feed.defs#contentModeUnspecified',
  DefsContentModeVideo: 'app.bsky.feed.defs#contentModeVideo',
  DefsInteractionSeen: 'app.bsky.feed.defs#interactionSeen',
  DefsInteractionLike: 'app.bsky.feed.defs#interactionLike',
  DefsInteractionRepost: 'app.bsky.feed.defs#interactionRepost',
  DefsInteractionReply: 'app.bsky.feed.defs#interactionReply',
  DefsInteractionQuote: 'app.bsky.feed.defs#interactionQuote',
  DefsInteractionShare: 'app.bsky.feed.defs#interactionShare',
}
export const APP_BSKY_GRAPH = {
  DefsModlist: 'app.bsky.graph.defs#modlist',
  DefsCuratelist: 'app.bsky.graph.defs#curatelist',
  DefsReferencelist: 'app.bsky.graph.defs#referencelist',
}

export function createServer(options?: XrpcOptions): Server {
  return new Server(options)
}

export class Server {
  xrpc: XrpcServer
  com: ComNS
  app: AppNS

  constructor(options?: XrpcOptions) {
    this.xrpc = createXrpcServer(schemas, options)
    this.com = new ComNS(this)
    this.app = new AppNS(this)
  }
}

export class ComNS {
  _server: Server
  atproto: ComAtprotoNS

  constructor(server: Server) {
    this._server = server
    this.atproto = new ComAtprotoNS(server)
  }
}

export class ComAtprotoNS {
  _server: Server
  repo: ComAtprotoRepoNS

  constructor(server: Server) {
    this._server = server
    this.repo = new ComAtprotoRepoNS(server)
  }
}

export class ComAtprotoRepoNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }
}

export class AppNS {
  _server: Server
  bsky: AppBskyNS
  nknk: AppNknkNS

  constructor(server: Server) {
    this._server = server
    this.bsky = new AppBskyNS(server)
    this.nknk = new AppNknkNS(server)
  }
}

export class AppBskyNS {
  _server: Server
  actor: AppBskyActorNS
  embed: AppBskyEmbedNS
  feed: AppBskyFeedNS
  richtext: AppBskyRichtextNS

  constructor(server: Server) {
    this._server = server
    this.actor = new AppBskyActorNS(server)
    this.embed = new AppBskyEmbedNS(server)
    this.feed = new AppBskyFeedNS(server)
    this.richtext = new AppBskyRichtextNS(server)
  }
}

export class AppBskyActorNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }
}

export class AppBskyEmbedNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }
}

export class AppBskyFeedNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }
}

export class AppBskyRichtextNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }
}

export class AppNknkNS {
  _server: Server
  feed: AppNknkFeedNS

  constructor(server: Server) {
    this._server = server
    this.feed = new AppNknkFeedNS(server)
  }
}

export class AppNknkFeedNS {
  _server: Server

  constructor(server: Server) {
    this._server = server
  }
}

type SharedRateLimitOpts<T> = {
  name: string
  calcKey?: (ctx: T) => string | null
  calcPoints?: (ctx: T) => number
}
type RouteRateLimitOpts<T> = {
  durationMs: number
  points: number
  calcKey?: (ctx: T) => string | null
  calcPoints?: (ctx: T) => number
}
type HandlerOpts = { blobLimit?: number }
type HandlerRateLimitOpts<T> = SharedRateLimitOpts<T> | RouteRateLimitOpts<T>
type ConfigOf<Auth, Handler, ReqCtx> =
  | Handler
  | {
      auth?: Auth
      opts?: HandlerOpts
      rateLimit?: HandlerRateLimitOpts<ReqCtx> | HandlerRateLimitOpts<ReqCtx>[]
      handler: Handler
    }
type ExtractAuth<AV extends AuthVerifier | StreamAuthVerifier> = Extract<
  Awaited<ReturnType<AV>>,
  { credentials: unknown }
>
