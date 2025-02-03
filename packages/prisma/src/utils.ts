import * as PostLexicon from '@niknak/lexicon/lexicon/types/app/bsky/feed/post'
import * as Prisma from '@prisma/client'
import * as VideoLexicon from '@niknak/lexicon/lexicon/types/app/bsky/embed/video'
import * as ProfileLexicon from '@niknak/lexicon/lexicon/types/app/bsky/actor/profile'
import prisma, { createBlobRef } from './prisma'

export async function upsertProfile(
    uri: string,
    did: string,
    profile: ProfileLexicon.Record
) {
    const {
        createdAt,
        description,
        displayName,
        joinedViaStarterPack,
        pinnedPost,
        ...rest
    } = profile

    const data: Prisma.Prisma.ProfileCreateInput = {
        displayName,
        description,
        createdAt,
        joinedViaStarterPack,
        pinnedPost,
        uri: uri,
        did: did,
        avatar: profile.avatar
            ? {
                  connectOrCreate: {
                      where: {
                          ref: profile.avatar.ref.toString(),
                      },
                      create: createBlobRef(profile.avatar),
                  },
              }
            : undefined,
        banner: profile.banner
            ? {
                  connectOrCreate: {
                      where: {
                          ref: profile.banner.ref.toString(),
                      },
                      create: createBlobRef(profile.banner),
                  },
              }
            : undefined,
        labels: profile.labels
            ? JSON.parse(JSON.stringify(profile.labels))
            : undefined,
    }

    await prisma.profile.upsert({
        where: { uri: uri },
        update: data,
        create: data,
    })
}

export async function upsertPost(
    profile: Prisma.Profile,
    uri: string,
    post: PostLexicon.Record
) {
    const { embed, text, labels, langs = [], createdAt } = post

    if (
        VideoLexicon.isMain(embed) &&
        VideoLexicon.validateMain(embed).success
    ) {
        const data: Prisma.Prisma.PostCreateInput = {
            uri: uri,
            text,
            labels,
            langs,
            createdAt: new Date(createdAt),
            did: profile.did,
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
                                create: createBlobRef(embed.video),
                            },
                        },
                        captions: {
                            createMany: {
                                data:
                                    embed.captions?.map((caption) => {
                                        return {
                                            cid: caption.file.ref.toString(),
                                            file: createBlobRef(caption.file),
                                            file_ref:
                                                caption.file.ref.toString(),
                                            lang: caption.lang,
                                        }
                                    }) ?? [],
                                skipDuplicates: true,
                            },
                        },
                    },
                },
            },
        }

        console.log('data', data)

        const post = await prisma.post.upsert({
            where: {
                uri: uri,
            },
            create: data,
            update: {},
        })

        return post
    }
}
