import { RequestWithAppContext } from '@app/context'
import { getSessionAgent } from '@app/session';
import { Controller, Get, Path, Request, Route, SuccessResponse } from 'tsoa'
import { isPostWithVideo } from '@app/utils/is';
import notEmpty from '@app/utils/notEmpty';
import { PostWithVideo } from './types';

@Route('posts')
export class PostsController extends Controller {
    @Get("{uri}")
    @SuccessResponse(200, 'Fetch a users video posts')
    public async get(
        @Path() uri: string,
        @Request() req: RequestWithAppContext
    ): Promise<PostWithVideo[]> {
        const agent = await getSessionAgent(req, req.context)

        if (!agent) throw new Error('Unauthenticated');

        const user = await req.context.db.profile.findUniqueOrThrow({
            where: { uri },
            select: {
                did: true,
                posts: true,
            }
        });

        const posts = (await Promise.all(user.posts.map(async (post) => {
            const record = await agent.com.atproto.repo.getRecord({
                rkey: 'self',
                collection: 'app.bsky.feed.post',
                repo: user.did,
            })

            const { data } = record;

            if (isPostWithVideo(data)) {
                return data;
            }
        }))).filter(notEmpty);

        return posts
    }
}
