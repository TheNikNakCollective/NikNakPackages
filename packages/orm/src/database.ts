import { DataSource, Repository } from 'typeorm'
import { Profile, profileRepository } from './repositories/profile'
import { AuthSession, authSessionRepository } from './repositories/auth-session'
import { AuthState, authStateRepository } from './repositories/auth-state'
import { Post, postRepository } from './repositories/post'
import { Video, videoRepository } from './repositories/video'
import { Caption, captionRepository } from './repositories/caption'

export interface NikNakDatabase {
    profileRepository: Repository<Profile>
    postRepository: Repository<Post>
    videoRepository: Repository<Video>
    captionRepository: Repository<Caption>
    authSession: Repository<AuthSession>
    authState: Repository<AuthState>
}

export function createDatabase(datasource: DataSource): NikNakDatabase {
    return {
        profileRepository: profileRepository(datasource),
        postRepository: postRepository(datasource),
        videoRepository: videoRepository(datasource),
        captionRepository: captionRepository(datasource),
        authSession: authSessionRepository(datasource),
        authState: authStateRepository(datasource),
    }
}
