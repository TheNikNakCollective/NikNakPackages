import { BlobRef } from '@atproto/lexicon'
import { Entity, Column, PrimaryColumn } from 'typeorm'
import { blobRefTransformer } from '../../transformers/blobRef'
import { Caption as BskyCaption } from '@niknak/lexicon/lexicon/types/app/bsky/embed/video'

@Entity('captions')
export class Caption implements BskyCaption {
    @PrimaryColumn()
    cid!: string

    @Column({ type: 'json', nullable: true, transformer: blobRefTransformer })
    file!: BlobRef

    @Column({ nullable: false })
    lang!: string;

    [x: string]: unknown
}
