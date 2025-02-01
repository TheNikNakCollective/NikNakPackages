import { IdResolver } from '@atproto/identity'
import { Firehose } from '@atproto/sync'
import * as PostLexicon from '@niknak/lexicon/lexicon/types/app/bsky/feed/post'
import * as VideoLexicon from '@niknak/lexicon/lexicon/types/app/bsky/embed/video'
import { Ingestor } from '../ingestor'
import { NikNakDatabase, Post } from '@niknak/orm'

const collection = 'app.bsky.feed.post'

/**
 * Ingests bsky posts that contain a video into the database.
 */
export class PostIngestor implements Ingestor {
    protected logger = console
    protected firehose: Firehose

    constructor(idResolver: IdResolver, db: NikNakDatabase) {
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
                        const { embed, text, labels, langs, createdAt } = record

                        if (
                            VideoLexicon.isMain(embed) &&
                            VideoLexicon.validateMain(embed).success
                        ) {
                            const data: Post = {
                                uri: evt.uri.toString(),
                                text,
                                labels,
                                langs,
                                createdAt,
                                did: evt.did,
                                video: {
                                    cid: embed.video.ref.toString(),
                                    video: embed.video,
                                    captions:
                                        embed.captions?.map((caption) => {
                                            return {
                                                cid: caption.file.ref.toString(),
                                                file: caption.file,
                                                lang: caption.lang,
                                            }
                                        }) ?? [],
                                },
                            }

                            await db.postRepository.save(data)
                        }
                    }
                } else if (
                    evt.event === 'delete' &&
                    evt.collection === collection
                ) {
                    await db.postRepository.delete(evt.uri.toString())
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
}
