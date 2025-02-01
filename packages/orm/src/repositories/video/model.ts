import { BlobRef } from '@atproto/lexicon'
import { Entity, Column, OneToMany, PrimaryColumn } from 'typeorm'
import { blobRefTransformer } from '../../transformers/blobRef'
import { Main as BksyVideo } from '@niknak/lexicon/lexicon/types/app/bsky/embed/video'
import { Caption } from '../caption'

@Entity('videos')
export class Video {
    @PrimaryColumn()
    cid!: string

    @Column({ type: 'json', nullable: true, transformer: blobRefTransformer })
    video!: BlobRef

    @OneToMany(() => Caption, (caption) => caption.uri)
    captions!: Caption[];

    [x: string]: unknown
}
