import * as PostLexicon from '@niknak/lexicon/lexicon/types/app/bsky/feed/post'
import * as VideoLexicon from '@niknak/lexicon/lexicon/types/app/bsky/embed/video'

export type PostWithVideo = Omit<PostLexicon.Record, 'embed'> & { embed: VideoLexicon.Main }