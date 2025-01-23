import { ValueTransformer } from 'typeorm'
import { TypedJsonBlobRef, BlobRef } from '@atproto/lexicon'

export const blobRefTransformer: ValueTransformer = {
    to: (value: BlobRef | undefined): TypedJsonBlobRef | undefined => {
        return value ? (value.toJSON() as TypedJsonBlobRef) : undefined
    },
    from: (value: TypedJsonBlobRef | undefined): BlobRef | undefined => {
        return value ? new BlobRef(value.ref, value.mimeType, value.size, value) : undefined
    },
}
