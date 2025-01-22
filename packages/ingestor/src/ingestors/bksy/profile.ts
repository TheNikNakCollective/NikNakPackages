import { IdResolver } from '@atproto/identity'
import { Firehose } from '@atproto/sync'
import * as Profile from '@niknak/lexicon/lexicon/types/app/bsky/actor/profile'
import { Ingestor } from '../ingestor'
import { NikNakDatabase } from '@niknak/orm'

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
                        Profile.isRecord(record) &&
                        Profile.validateRecord(record).success
                    ) {
                        await db.profileRepository.save(record)
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
