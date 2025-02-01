import { BlobRef } from '@atproto/lexicon'
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
} from 'typeorm'
import * as ComAtprotoLabelDefs from '@niknak/lexicon/lexicon/types/com/atproto/label/defs'
import * as ComAtprotoRepoStrongRef from '@niknak/lexicon/lexicon/types/com/atproto/repo/strongRef'
import { blobRefTransformer } from '../../transformers/blobRef'
import { Record as NikNakPost } from '@niknak/lexicon/lexicon/types/app/nknk/feed/post'
import { Video } from '../video'

@Entity('posts')
export class Post implements NikNakPost {
    @PrimaryGeneratedColumn()
    uri!: string

    @Column({ nullable: false })
    text!: string

    @Column({ nullable: false })
    did!: string

    @Column({ type: 'jsonb', nullable: true })
    tags?: string[]

    @Column({ type: 'jsonb', nullable: true })
    langs?: string[]

    @OneToOne(() => Video, (video) => video.uri)
    video!: Video

    @Column({ type: 'json', nullable: true })
    labels?:
        | ComAtprotoLabelDefs.SelfLabels
        | { $type: string; [k: string]: unknown }

    @Column({ type: 'timestamp', nullable: false })
    createdAt!: string;

    [x: string]: unknown
}
