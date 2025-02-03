import { RequestWithAppContext } from '@app/context'
import { getSessionAgent } from '@app/session'
import { Controller, Get, Request, Route, SuccessResponse } from 'tsoa'
import notEmpty from '@app/utils/notEmpty'
import { Post } from './types'
import * as AppBskyEmbedVideo from '@atproto/api/dist/client/types/app/bsky/embed/video'

@Route('me')
export class PostsController extends Controller {
    @Get('/posts')
    @SuccessResponse(200, 'Fetch a users video posts')
    public async posts(@Request() req: RequestWithAppContext): Promise<Post[]> {
        const agent = await getSessionAgent(req, req.context)

        if (!agent || !agent.profile) throw new Error('Unauthenticated')

        const posts = await req.context.db.post.findMany({
            where: { owner_uri: agent.profile.uri },
            include: {
                video: true,
            },
        })

        const bskyPosts = await agent.getPosts({
            uris: [...posts.map((post) => post.uri)],
        })

        const formattedPosts: Post[] = bskyPosts.data.posts
            .map((post) => {
                const { embed } = post

                if (AppBskyEmbedVideo.isView(embed)) {
                    return {
                        uri: post.uri,
                        cid: post.cid,
                        playlist: embed.playlist,
                        thumbnail: embed.thumbnail,
                        aspectRatio: embed.aspectRatio,
                        replyCount: post.replyCount ?? 0,
                        repostCount: post.repostCount ?? 0,
                        likeCount: post.likeCount ?? 0,
                        quoteCount: post.quoteCount ?? 0,
                    }
                }

                return null
            })
            .filter(notEmpty)

        return formattedPosts
    }
}
