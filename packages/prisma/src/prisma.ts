import './types'
import { PrismaClient, BlobRef } from '@prisma/client'
import type { BlobRef as AtProtoBlobRef } from '@atproto/lexicon'

const prisma = new PrismaClient({
    log: [
        {
            emit: 'event',
            level: 'error',
        },
        {
            emit: 'event',
            level: 'warn',
        },
    ],
})

prisma.$on('error', (e) => {
    console.error(e.message)
})

prisma.$on('warn', (e) => {
    console.error(e.message)
})

export function createBlobRef(blobRef: AtProtoBlobRef) {
    return {
        ref: blobRef.ref.toString(),
        mimeType: blobRef.mimeType,
        size: blobRef.size,
        original: blobRef.toJSON() as Record<string, any>,
    }
}

export default prisma
