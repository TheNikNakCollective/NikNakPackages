import { IdResolver } from '@atproto/identity'
import { Firehose } from '@atproto/sync'
import * as ProfileLexicon from '@niknak/lexicon/lexicon/types/app/bsky/actor/profile'
import { Ingestor } from '../ingestor'
import { NikNakDatabase, Profile } from '@niknak/orm'

export class ProfileIngestor implements Ingestor {
    protected logger = console
    protected firehose: Firehose

    constructor(idResolver: IdResolver, db: NikNakDatabase) {
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
                        const data: Profile = {
                            ...record,
                            uri: evt.uri.toString(),
                            did: evt.did,
                            avatar: record.avatar,
                            banner: record.banner,
                        }

                        await db.profileRepository.save(data)
                    }
                } else if (
                    evt.event === 'delete' &&
                    evt.collection === 'app.bsky.actor.profile'
                ) {
                    await db.profileRepository.delete(evt.uri.toString())
                }
            },
            onError: (err) => {
                this.logger.error({ err }, 'error on firehose ingestion')
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
