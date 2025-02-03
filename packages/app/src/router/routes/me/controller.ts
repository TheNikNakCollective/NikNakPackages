import { RequestWithAppContext } from '@app/context'
import { getSessionAgent } from '@app/session'
import { Controller, Get, Path, Request, Route, SuccessResponse } from 'tsoa'
import { isPostWithVideo } from '@app/utils/is'
import notEmpty from '@app/utils/notEmpty'
import { Post } from './types'

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

        console.log(bskyPosts.data.posts)

        // const posts = (await Promise.all(user.posts.map(async (post) => {
        //     const record = await agent.getPost({
        //         rkey: 'self',
        //         repo: user.did,
        //     })

        //     const { value } = record;

        //     if (isPostWithVideo(value)) {
        //         return value;
        //     }
        // }))).filter(notEmpty);

        return []
    }
}
