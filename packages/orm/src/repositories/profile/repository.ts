import { DataSource } from 'typeorm'
import { Profile } from './model'

export function profileRepository(datasource: DataSource) {
    return datasource.getRepository(Profile)
}
