import { RequestWithAppContext } from '@app/context'
import { getSessionAgent } from '@app/session';
import { Controller, Get, Path, Request, Route, SuccessResponse } from 'tsoa'
import { isPostWithVideo } from '@app/utils/is';
import notEmpty from '@app/utils/notEmpty';
import { PostWithVideo } from './types';


@Route('me')
export class PostsController extends Controller {
    @Get("/posts")
    @SuccessResponse(200, 'Fetch a users video posts')
    public async posts(
        @Path() uri: string,
        @Request() req: RequestWithAppContext
    ): Promise<PostWithVideo[]> {
        const agent = await getSessionAgent(req, req.context)

        if (!agent) throw new Error('Unauthenticated');

        const user = await req.context.db.profile.findUniqueOrThrow({
            where: { uri },
            select: {
                did: true,
                posts: {
                    include: {
                        video: true
                    }
                },
            }
        });

        const posts = await agent.getPosts({
            uris: [...user.posts.map((post) => post.uri)]
        })

        console.log(posts);

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
