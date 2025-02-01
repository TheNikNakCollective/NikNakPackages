import { DataSource } from 'typeorm'
import { Caption } from './model'

export function captionRepository(datasource: DataSource) {
    return datasource.getRepository(Caption)
}
