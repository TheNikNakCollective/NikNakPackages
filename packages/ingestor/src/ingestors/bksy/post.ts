import { IdResolver } from '@atproto/identity'
import { Firehose } from '@atproto/sync'
import * as PostLexicon from '@niknak/lexicon/lexicon/types/app/bsky/feed/post'
import * as VideoLexicon from '@niknak/lexicon/lexicon/types/app/bsky/embed/video'
import { Ingestor } from '../ingestor'
import { AtpAgent } from '@atproto/api'
import * as ProfileLexicon from '@niknak/lexicon/lexicon/types/app/bsky/actor/profile'
import prisma, { createBlobRef, Prisma } from '@niknak/prisma'

const collection = 'app.bsky.feed.post'

/**
 * Ingests bsky posts that contain a video into the database.
 */
export class PostIngestor implements Ingestor {
    protected logger = console
    protected firehose: Firehose
    private db: typeof prisma

    constructor(idResolver: IdResolver, db: typeof prisma) {
        this.db = db

        this.firehose = new Firehose({
            idResolver,
            handleEvent: async (evt) => {
                if (evt.event === 'create' || evt.event === 'update') {
                    const record = evt.record

                    if (
                        evt.collection === collection &&
                        PostLexicon.isRecord(record) &&
                        PostLexicon.validateRecord(record).success
                    ) {
                        const {
                            embed,
                            text,
                            labels,
                            langs = [],
                            createdAt,
                        } = record

                        if (
                            VideoLexicon.isMain(embed) &&
                            VideoLexicon.validateMain(embed).success
                        ) {
                            const profile = await this.syncProfile(evt.did)

                            console.log('profile', profile)

                            const data: Prisma.Prisma.PostCreateInput = {
                                uri: evt.uri.toString(),
                                text,
                                labels,
                                langs,
                                createdAt: new Date(createdAt),
                                did: evt.did,
                                owner: {
                                    connect: {
                                        uri: profile.uri,
                                    },
                                },
                                video: {
                                    connectOrCreate: {
                                        where: {
                                            cid: embed.video.ref.toString(),
                                        },
                                        create: {
                                            cid: embed.video.ref.toString(),
                                            video: {
                                                connectOrCreate: {
                                                    where: {
                                                        ref: embed.video.ref.toString(),
                                                    },
                                                    create: createBlobRef(
                                                        embed.video
                                                    ),
                                                },
                                            },
                                            captions: {
                                                createMany: {
                                                    data:
                                                        embed.captions?.map(
                                                            (caption) => {
                                                                return {
                                                                    cid: caption.file.ref.toString(),
                                                                    file: createBlobRef(
                                                                        caption.file
                                                                    ),
                                                                    file_ref:
                                                                        caption.file.ref.toString(),
                                                                    lang: caption.lang,
                                                                }
                                                            }
                                                        ) ?? [],
                                                    skipDuplicates: true,
                                                },
                                            },
                                        },
                                    },
                                },
                            }

                            const post = await db.post.upsert({
                                where: {
                                    uri: evt.uri.toString(),
                                },
                                create: data,
                                update: data,
                            })

                            console.log(post)
                        }
                    }
                } else if (
                    evt.event === 'delete' &&
                    evt.collection === collection
                ) {
                    const post = await db.post.findFirst({
                        where: { uri: evt.uri.toString() },
                    })

                    if (post) {
                        await db.post.delete({
                            where: { uri: evt.uri.toString() },
                        })
                    }
                }
            },
            onError: (err) => {
                this.logger.error({ err }, 'error on post firehose ingestion')
            },
            filterCollections: [collection],
            excludeIdentity: true,
            excludeAccount: true,
        })
    }

    public async start() {
        await this.firehose.start()
    }

    public async destory() {
        await this.firehose.destroy()
    }

    public async syncProfile(did: string) {
        const agent = new AtpAgent({ service: 'https://bsky.social' })

        const record = await agent.com.atproto.repo.getRecord({
            rkey: 'self',
            collection: 'app.bsky.actor.profile',
            repo: did,
        })

        const { value } = record.data

        if (
            ProfileLexicon.isRecord(value) &&
            ProfileLexicon.validateRecord(value).success
        ) {
            const {
                avatar,
                banner,
                createdAt,
                description,
                displayName,
                joinedViaStarterPack,
                pinnedPost,
                ...rest
            } = value

            const data: Prisma.Prisma.ProfileCreateInput = {
                displayName,
                description,
                createdAt,
                joinedViaStarterPack,
                pinnedPost,
                uri: record.data.uri,
                did: did,
                avatar: avatar
                    ? {
                          connectOrCreate: {
                              where: {
                                  ref: avatar.ref.toString(),
                              },
                              create: createBlobRef(avatar),
                          },
                      }
                    : undefined,
                banner: banner
                    ? {
                          connectOrCreate: {
                              where: {
                                  ref: banner.ref.toString(),
                              },
                              create: createBlobRef(banner),
                          },
                      }
                    : undefined,
            }

            return this.db.profile.upsert({
                where: {
                    uri: record.data.uri,
                },
                create: data,
                update: data,
            })
        } else {
            throw new Error(`Unable to find profile for did ${did}`)
        }
    }
}
