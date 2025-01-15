import { Entity, Column, PrimaryColumn } from 'typeorm'
import type { NodeSavedState } from '@atproto/oauth-client-node'

@Entity('auth_states')
export class AuthState {
    @PrimaryColumn()
    key!: string

    @Column({ type: 'json', nullable: false })
    state!: NodeSavedState
}
