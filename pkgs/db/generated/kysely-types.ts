import type { ColumnType } from 'kysely'
export type Generated<T> = T extends ColumnType<
  infer S,
  infer I,
  infer U
>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export const ProfileStatus = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  DISABLED: 'DISABLED',
  SYSTEM_DEACTIVATED: 'SYSTEM_DEACTIVATED',
  SHARED: 'SHARED',
} as const
export type ProfileStatus =
  (typeof ProfileStatus)[keyof typeof ProfileStatus]
export const ProfileRole = {
  USER_ROLE_UNKNOWN: 'USER_ROLE_UNKNOWN',
  USER_ROLE_SHARED: 'USER_ROLE_SHARED',
  USER_ROLE_VERIFIED: 'USER_ROLE_VERIFIED',
  USER_ROLE_ADMIN: 'USER_ROLE_ADMIN',
} as const
export type ProfileRole =
  (typeof ProfileRole)[keyof typeof ProfileRole]
export const ProfileType = {
  HUMAN: 'HUMAN',
  SERVICE: 'SERVICE',
} as const
export type ProfileType =
  (typeof ProfileType)[keyof typeof ProfileType]
export const Visibility = {
  VISIBILITY_PRIVATE: 'VISIBILITY_PRIVATE',
  VISIBILITY_PUBLIC: 'VISIBILITY_PUBLIC',
} as const
export type Visibility = (typeof Visibility)[keyof typeof Visibility]
export const MediaType = {
  MEDIA_TYPE_UNKNOWN: 'MEDIA_TYPE_UNKNOWN',
  MEDIA_TYPE_AUDIO: 'MEDIA_TYPE_AUDIO',
  MEDIA_TYPE_VIDEO: 'MEDIA_TYPE_VIDEO',
  MEDIA_TYPE_AUDIO_VIDEO_DASH: 'MEDIA_TYPE_AUDIO_VIDEO_DASH',
  MEDIA_TYPE_MPD: 'MEDIA_TYPE_MPD',
  MEDIA_TYPE_AUDIO_MP3: 'MEDIA_TYPE_AUDIO_MP3',
  MEDIA_TYPE_DASH_SIDX: 'MEDIA_TYPE_DASH_SIDX',
  MEDIA_TYPE_CHARTER_HTML: 'MEDIA_TYPE_CHARTER_HTML',
  MEDIA_TYPE_VIDEO_FRAMES: 'MEDIA_TYPE_VIDEO_FRAMES',
} as const
export type MediaType = (typeof MediaType)[keyof typeof MediaType]
export type Media = {
  id: Generated<string>
  uri: string
  revisionId: string
  mimeType: string
  transcribed: boolean
  creatorId: string
  visibility: Visibility
  type: MediaType
}
export type Profile = {
  id: Generated<string>
  hashedPassword: string
  name: string
  firstName: string
  lastName: string
  username: string
  email: string
  organization: string | null
  bio: string | null
  providerId: string | null
  acl: string | null
  status: Generated<ProfileStatus>
  type: Generated<ProfileType>
  role: Generated<ProfileRole>
}
export type Project = {
  id: Generated<string>
  name: string
  revisionId: string
  creatorId: string
  description: string
  premiereProjectId: string
  visibility: Visibility
}
export type DB = {
  Media: Media
  Profile: Profile
  Project: Project
}
