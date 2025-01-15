import { Entity, Column, PrimaryColumn } from 'typeorm'
import type { NodeSavedSession } from '@atproto/oauth-client-node'
import { ValueTransformer } from 'typeorm'

export const transformer: ValueTransformer = {
    to: (value: NodeSavedSession | undefined): string | undefined => {
        return value ? JSON.stringify(value) : undefined
    },
    from: (value: string | undefined): NodeSavedSession | undefined => {
        return value ? JSON.parse(value) : undefined
    },
}

@Entity('auth_sessions')
export class AuthSession {
    @PrimaryColumn()
    key!: string

    @Column({ type: 'json', nullable: false, transformer })
    session!: NodeSavedSession
}
