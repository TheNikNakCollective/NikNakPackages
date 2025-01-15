import { Entity, Column, PrimaryColumn } from 'typeorm'
import type { NodeSavedState } from '@atproto/oauth-client-node'
import { ValueTransformer } from 'typeorm'

export const transformer: ValueTransformer = {
    to: (value: NodeSavedState | undefined): string | undefined => {
        return value ? JSON.stringify(value) : undefined
    },
    from: (value: string | undefined): NodeSavedState | undefined => {
        return value ? JSON.parse(value) : undefined
    },
}

@Entity('auth_states')
export class AuthState {
    @PrimaryColumn()
    key!: string

    @Column({ type: 'json', nullable: false, transformer })
    state!: NodeSavedState
}
