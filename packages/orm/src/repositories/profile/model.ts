import { Record as ActorProfile } from '@niknak/lexicon/lexicon/types/app/bsky/actor/profile'
import { TypedJsonBlobRef, BlobRef } from '@atproto/lexicon'
import { Entity, Column, PrimaryColumn } from 'typeorm'
import { blobRefTransformer } from '@app/transformers/blobRef'
import * as ComAtprotoLabelDefs from '@niknak/lexicon/lexicon/types/com/atproto/label/defs'
import * as ComAtprotoRepoStrongRef from '@niknak/lexicon/lexicon/types/com/atproto/repo/strongRef'

@Entity('profiles')
export class Profile implements ActorProfile {
    @PrimaryColumn()
    uri!: string

    @Column({ nullable: false })
    did!: string

    @Column({ nullable: true })
    displayName?: string

    @Column({ type: 'text', nullable: true })
    description?: string

    @Column({ type: 'json', nullable: true, transformer: blobRefTransformer })
    avatar?: BlobRef

    @Column({ type: 'json', nullable: true, transformer: blobRefTransformer })
    banner?: BlobRef

    @Column({ type: 'json', nullable: true })
    labels?:
        | ComAtprotoLabelDefs.SelfLabels
        | { $type: string; [k: string]: unknown }

    @Column({ type: 'json', nullable: true })
    joinedViaStarterPack?: ComAtprotoRepoStrongRef.Main

    @Column({ type: 'json', nullable: true })
    pinnedPost?: ComAtprotoRepoStrongRef.Main

    @Column({ type: 'timestamp', nullable: true })
    createdAt?: string

    @Column({ type: 'json', nullable: true })
    additionalProperties?: { [key: string]: unknown };

    [x: string]: unknown
}
