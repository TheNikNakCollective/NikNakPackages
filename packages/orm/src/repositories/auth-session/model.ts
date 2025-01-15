import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity('auth_sessions')
export class AuthSession {
    @PrimaryColumn()
    key!: string

    @Column({ nullable: true })
    session?: string
}
