/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { lexicons } from '../../../../lexicons'
import { isObj, hasProp } from '../../../../util'
import { CID } from 'multiformats/cid'
import * as AppBskyRichtextFacet from '../../bsky/richtext/facet'
import * as AppBskyEmbedImages from '../../bsky/embed/images'
import * as AppBskyEmbedVideo from '../../bsky/embed/video'
import * as ComAtprotoLabelDefs from '../../../com/atproto/label/defs'
import * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef'

export interface Record {
  /** The primary post content. May be an empty string, if there are embeds. */
  text: string
  /** DEPRECATED: replaced by app.bsky.richtext.facet. */
  entities?: Entity[]
  /** Annotations of text (mentions, URLs, hashtags, etc) */
  facets?: AppBskyRichtextFacet.Main[]
  reply?: ReplyRef
  embed?:
    | AppBskyEmbedImages.Main
    | AppBskyEmbedVideo.Main
    | { $type: string; [k: string]: unknown }
  /** Indicates human language of post primary text content. */
  langs?: string[]
  labels?:
    | ComAtprotoLabelDefs.SelfLabels
    | { $type: string; [k: string]: unknown }
  /** Additional hashtags, in addition to any included in post text and facets. */
  tags?: string[]
  /** Client-declared timestamp when this post was originally created. */
  createdAt: string
  [k: string]: unknown
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'app.nknk.feed.post#main' || v.$type === 'app.nknk.feed.post')
  )
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('app.nknk.feed.post#main', v)
}

export interface ReplyRef {
  root: ComAtprotoRepoStrongRef.Main
  parent: ComAtprotoRepoStrongRef.Main
  [k: string]: unknown
}

export function isReplyRef(v: unknown): v is ReplyRef {
  return (
    isObj(v) && hasProp(v, '$type') && v.$type === 'app.nknk.feed.post#replyRef'
  )
}

export function validateReplyRef(v: unknown): ValidationResult {
  return lexicons.validate('app.nknk.feed.post#replyRef', v)
}

/** Deprecated: use facets instead. */
export interface Entity {
  index: TextSlice
  /** Expected values are 'mention' and 'link'. */
  type: string
  value: string
  [k: string]: unknown
}

export function isEntity(v: unknown): v is Entity {
  return (
    isObj(v) && hasProp(v, '$type') && v.$type === 'app.nknk.feed.post#entity'
  )
}

export function validateEntity(v: unknown): ValidationResult {
  return lexicons.validate('app.nknk.feed.post#entity', v)
}

/** Deprecated. Use app.bsky.richtext instead -- A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings. */
export interface TextSlice {
  start: number
  end: number
  [k: string]: unknown
}

export function isTextSlice(v: unknown): v is TextSlice {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'app.nknk.feed.post#textSlice'
  )
}

export function validateTextSlice(v: unknown): ValidationResult {
  return lexicons.validate('app.nknk.feed.post#textSlice', v)
}
