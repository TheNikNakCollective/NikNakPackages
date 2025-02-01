import { DataSource } from 'typeorm'
import { Post } from './model'

export function postRepository(datasource: DataSource) {
    return datasource.getRepository(Post)
}
