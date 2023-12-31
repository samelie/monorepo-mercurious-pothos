// Generated by ts-to-zod
import { z } from 'zod'

export const userStatusSchema = z.union([
  z.literal('PENDING'),
  z.literal('ACTIVE'),
  z.literal('DISABLED'),
  z.literal('SYSTEM_DEACTIVATED'),
  z.literal('SHARED'),
])

export const userRoleSchema = z.union([
  z.literal('USER_ROLE_UNKNOWN'),
  z.literal('USER_ROLE_SHARED'),
  z.literal('USER_ROLE_VERIFIED'),
  z.literal('USER_ROLE_ADMIN'),
])

export const userTypeSchema = z.union([
  z.literal('HUMAN'),
  z.literal('SERVICE'),
])

export const visibilitySchema = z.union([
  z.literal('VISIBILITY_PRIVATE'),
  z.literal('VISIBILITY_PUBLIC'),
])

export const mediaTypeSchema = z.union([
  z.literal('MEDIA_TYPE_UNKNOWN'),
  z.literal('MEDIA_TYPE_AUDIO'),
  z.literal('MEDIA_TYPE_VIDEO'),
  z.literal('MEDIA_TYPE_AUDIO_VIDEO_DASH'),
  z.literal('MEDIA_TYPE_MPD'),
  z.literal('MEDIA_TYPE_AUDIO_MP3'),
  z.literal('MEDIA_TYPE_DASH_SIDX'),
  z.literal('MEDIA_TYPE_CHARTER_HTML'),
  z.literal('MEDIA_TYPE_VIDEO_FRAMES'),
])

export const mediaSchema = z.object({
  id: z.string(),
  uri: z.string(),
  revisionId: z.string(),
  mimeType: z.string(),
  transcribed: z.boolean(),
  creatorId: z.string(),
  visibility: visibilitySchema,
  type: mediaTypeSchema,
  mediaGroupId: z.string(),
})

export const mediaGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
  creatorId: z.string(),
})

export const projectSchema = z.object({
  id: z.string(),
  name: z.string(),
  revisionId: z.string(),
  creatorId: z.string(),
  description: z.string(),
  premiereProjectId: z.string(),
  visibility: visibilitySchema,
})

export const userSchema = z.object({
  id: z.string(),
  supabaseId: z.string(),
  name: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  email: z.string(),
  organization: z.string().nullable(),
  bio: z.string().nullable(),
  providerId: z.string().nullable(),
  acl: z.string().nullable(),
  status: userStatusSchema,
  type: userTypeSchema,
  role: userRoleSchema,
})

export const dbSchema = z.object({
  Media: mediaSchema,
  MediaGroup: mediaGroupSchema,
  Project: projectSchema,
  User: userSchema,
})
