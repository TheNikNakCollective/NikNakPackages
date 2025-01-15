import { DataSource } from 'typeorm'
import { AuthSession } from './model'

export function authSessionRepository(datasource: DataSource) {
    return datasource.getRepository(AuthSession)
}
