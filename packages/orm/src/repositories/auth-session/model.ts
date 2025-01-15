import { Entity, Column, PrimaryColumn } from 'typeorm'
import type { NodeSavedSession } from '@atproto/oauth-client-node'

@Entity('auth_sessions')
export class AuthSession {
    @PrimaryColumn()
    key!: string

    @Column({ type: 'json', nullable: false })
    session!: NodeSavedSession
}
