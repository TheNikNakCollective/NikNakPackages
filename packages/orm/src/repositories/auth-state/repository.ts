import { DataSource } from 'typeorm'
import { AuthState } from './model'

export function authStateRepository(datasource: DataSource) {
    return datasource.getRepository(AuthState)
}
