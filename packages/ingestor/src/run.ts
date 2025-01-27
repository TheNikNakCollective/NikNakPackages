import { createIdResolver } from '@niknak/id-resolver'
import { Ingestors } from './ingestors'
import { NikNakDatabase } from '@niknak/orm'

export async function start(db: NikNakDatabase) {
    console.log('Starting ingestor...');

    const baseIdResolver = createIdResolver()

    const ingestors = new Ingestors(baseIdResolver, db)

    const onCloseSignal = async () => {
        setTimeout(() => process.exit(1), 10000).unref();
        await ingestors.destroy()
        process.exit()
    }

    process.on('SIGINT', onCloseSignal)
    process.on('SIGTERM', onCloseSignal)

    console.log('Ingestor successfully started!');

    await ingestors.start()
}
