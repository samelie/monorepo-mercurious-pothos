-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'DISABLED', 'SYSTEM_DEACTIVATED', 'SHARED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER_ROLE_UNKNOWN', 'USER_ROLE_SHARED', 'USER_ROLE_VERIFIED', 'USER_ROLE_ADMIN');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('HUMAN', 'SERVICE');

-- CreateEnum
CREATE TYPE "Visibility" AS ENUM ('VISIBILITY_PRIVATE', 'VISIBILITY_PUBLIC');

-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('MEDIA_TYPE_UNKNOWN', 'MEDIA_TYPE_AUDIO', 'MEDIA_TYPE_VIDEO', 'MEDIA_TYPE_AUDIO_VIDEO_DASH', 'MEDIA_TYPE_MPD', 'MEDIA_TYPE_AUDIO_MP3', 'MEDIA_TYPE_DASH_SIDX', 'MEDIA_TYPE_CHARTER_HTML', 'MEDIA_TYPE_VIDEO_FRAMES');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "supabaseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "organization" TEXT,
    "bio" TEXT,
    "providerId" TEXT,
    "acl" TEXT,
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "type" "UserType" NOT NULL DEFAULT 'SERVICE',
    "role" "UserRole" NOT NULL DEFAULT 'USER_ROLE_UNKNOWN',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "revisionId" TEXT NOT NULL,
    "creatorId" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "premiereProjectId" TEXT NOT NULL,
    "visibility" "Visibility" NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Media" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "uri" TEXT NOT NULL,
    "revisionId" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "transcribed" BOOLEAN NOT NULL,
    "creatorId" UUID NOT NULL,
    "visibility" "Visibility" NOT NULL,
    "type" "MediaType" NOT NULL,
    "mediaGroupId" UUID NOT NULL,

    CONSTRAINT "Media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MediaGroup" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "creatorId" UUID NOT NULL,

    CONSTRAINT "MediaGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_mediaGroupId_fkey" FOREIGN KEY ("mediaGroupId") REFERENCES "MediaGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MediaGroup" ADD CONSTRAINT "MediaGroup_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
