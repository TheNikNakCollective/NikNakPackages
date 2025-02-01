import { DataSource } from 'typeorm'
import { Video } from './model'

export function videoRepository(datasource: DataSource) {
    return datasource.getRepository(Video)
}
