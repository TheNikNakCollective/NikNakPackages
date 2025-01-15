import { DataSource, Repository } from 'typeorm'
import { Profile, profileRepository } from './repositories/profile'
import { AuthSession, authSessionRepository } from './repositories/auth-session'
import { AuthState, authStateRepository } from './repositories/auth-state'

export interface NikNakDatabase {
    profileRepository: Repository<Profile>
    authSession: Repository<AuthSession>
    authState: Repository<AuthState>
}

export function createDatabase(datasource: DataSource): NikNakDatabase {
    return {
        profileRepository: profileRepository(datasource),
        authSession: authSessionRepository(datasource),
        authState: authStateRepository(datasource),
    }
}
