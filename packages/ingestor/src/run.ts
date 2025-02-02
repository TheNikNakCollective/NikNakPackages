import { createIdResolver } from '@niknak/id-resolver'
import { Ingestors } from './ingestors'
import prisma from '@niknak/prisma'

export async function start(db: typeof prisma) {
    console.log('Starting ingestor...')

    const baseIdResolver = createIdResolver()

    const ingestors = new Ingestors(baseIdResolver, db)

    const onCloseSignal = async () => {
        setTimeout(() => process.exit(1), 10000).unref()
        await ingestors.destroy()
        process.exit()
    }

    process.on('SIGINT', onCloseSignal)
    process.on('SIGTERM', onCloseSignal)

    console.log('Ingestor successfully started!')

    await ingestors.start()
}
