import { AspectRatio } from '@niknak/lexicon/lexicon/types/app/bsky/embed/defs'

export type Post = {
    uri: string
    cid: string
    playlist: string
    thumbnail?: string
    replyCount: number
    repostCount: number
    likeCount: number
    quoteCount: number
    aspectRatio?: AspectRatio
}
