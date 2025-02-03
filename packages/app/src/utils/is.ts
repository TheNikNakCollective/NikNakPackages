import * as PostLexicon from '@niknak/lexicon/lexicon/types/app/bsky/feed/post'
import * as ProfileLexicon from '@niknak/lexicon/lexicon/types/app/bsky/actor/profile'
import * as VideoLexicon from '@niknak/lexicon/lexicon/types/app/bsky/embed/video'

export type PostWithVideo = Omit<PostLexicon.Record, 'embed'> & {
    embed: VideoLexicon.Main
}

export function isProfile(value: any): value is ProfileLexicon.Record {
    if (
        ProfileLexicon.isRecord(value) &&
        ProfileLexicon.validateRecord(value).success
    ) {
        return true
    }

    return false
}

export function isPost(value: any): value is PostLexicon.Record {
    if (
        PostLexicon.isRecord(value) &&
        PostLexicon.validateRecord(value).success
    ) {
        return true
    }

    return false
}

export function isPostWithVideo(value: any): value is PostWithVideo {
    if (
        PostLexicon.isRecord(value) &&
        PostLexicon.validateRecord(value).success
    ) {
        const { embed } = value

        if (
            VideoLexicon.isMain(embed) &&
            VideoLexicon.validateMain(embed).success
        ) {
            return true
        }
    }

    return false
}
