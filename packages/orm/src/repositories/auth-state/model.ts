import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('auth_states')
export class AuthState {
    @PrimaryColumn()
    key!: string

    @Column({ nullable: true })
    state?: string
}
