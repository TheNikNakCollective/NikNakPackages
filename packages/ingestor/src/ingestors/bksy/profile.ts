import { IdResolver } from '@atproto/identity'
import { Firehose } from '@atproto/sync'
import * as ProfileLexicon from '@niknak/lexicon/lexicon/types/app/bsky/actor/profile'
import { Ingestor } from '../ingestor'
import prisma, { Prisma, createBlobRef } from '@niknak/prisma'

/**
 * Ingests bluesky profiles into the database.
 */
export class ProfileIngestor implements Ingestor {
    protected logger = console
    protected firehose: Firehose

    constructor(idResolver: IdResolver, db: typeof prisma) {
        this.firehose = new Firehose({
            idResolver,
            handleEvent: async (evt) => {
                if (evt.event === 'create' || evt.event === 'update') {
                    const record = evt.record

                    if (
                        evt.collection === 'app.bsky.actor.profile' &&
                        ProfileLexicon.isRecord(record) &&
                        ProfileLexicon.validateRecord(record).success
                    ) {
                        const {
                            createdAt,
                            description,
                            displayName,
                            joinedViaStarterPack,
                            pinnedPost,
                            ...rest
                        } = record

                        const data: Prisma.Prisma.ProfileCreateInput = {
                            displayName,
                            description,
                            createdAt,
                            joinedViaStarterPack,
                            pinnedPost,
                            uri: evt.uri.toString(),
                            did: evt.did,
                            avatar: record.avatar
                                ? {
                                      connectOrCreate: {
                                          where: {
                                              ref: record.avatar.ref.toString(),
                                          },
                                          create: createBlobRef(record.avatar),
                                      },
                                  }
                                : undefined,
                            banner: record.banner
                                ? {
                                      connectOrCreate: {
                                          where: {
                                              ref: record.banner.ref.toString(),
                                          },
                                          create: createBlobRef(record.banner),
                                      },
                                  }
                                : undefined,
                            labels: record.labels
                                ? JSON.parse(JSON.stringify(record.labels))
                                : undefined,
                        }

                        await db.profile.upsert({
                            where: { uri: evt.uri.toString() },
                            update: data,
                            create: data,
                        })
                    }
                } else if (
                    evt.event === 'delete' &&
                    evt.collection === 'app.bsky.actor.profile'
                ) {
                    await db.profile.delete({
                        where: {
                            uri: evt.uri.toString(),
                        },
                    })
                }
            },
            onError: (err) => {
                this.logger.error(
                    { err },
                    'error on profile firehose ingestion'
                )
            },
            filterCollections: ['app.bsky.actor.profile'],
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
}
