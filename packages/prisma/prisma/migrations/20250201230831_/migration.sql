-- CreateTable
CREATE TABLE "AuthSession" (
    "key" TEXT NOT NULL,
    "session" JSONB NOT NULL,

    CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "AuthState" (
    "key" TEXT NOT NULL,
    "state" JSONB NOT NULL,

    CONSTRAINT "AuthState_pkey" PRIMARY KEY ("key")
);

-- CreateTable
CREATE TABLE "Profile" (
    "uri" TEXT NOT NULL,
    "did" TEXT NOT NULL,
    "displayName" TEXT,
    "description" TEXT,
    "avatar_ref" TEXT,
    "banner_ref" TEXT,
    "labels" JSONB,
    "joinedViaStarterPack" JSONB,
    "pinnedPost" JSONB,
    "createdAt" TIMESTAMP(3),
    "additionalProperties" JSONB,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("uri")
);

-- CreateTable
CREATE TABLE "Post" (
    "uri" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "did" TEXT NOT NULL,
    "tags" TEXT[],
    "langs" TEXT[],
    "labels" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "owner_uri" TEXT NOT NULL,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("uri")
);

-- CreateTable
CREATE TABLE "Video" (
    "cid" TEXT NOT NULL,
    "video_ref" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "Caption" (
    "cid" TEXT NOT NULL,
    "file_ref" TEXT NOT NULL,
    "lang" TEXT NOT NULL,
    "video_ref" TEXT NOT NULL,

    CONSTRAINT "Caption_pkey" PRIMARY KEY ("cid")
);

-- CreateTable
CREATE TABLE "BlobRef" (
    "ref" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "original" JSONB,

    CONSTRAINT "BlobRef_pkey" PRIMARY KEY ("ref")
);

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_avatar_ref_fkey" FOREIGN KEY ("avatar_ref") REFERENCES "BlobRef"("ref") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_banner_ref_fkey" FOREIGN KEY ("banner_ref") REFERENCES "BlobRef"("ref") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_owner_uri_fkey" FOREIGN KEY ("owner_uri") REFERENCES "Profile"("uri") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_video_ref_fkey" FOREIGN KEY ("video_ref") REFERENCES "BlobRef"("ref") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caption" ADD CONSTRAINT "Caption_file_ref_fkey" FOREIGN KEY ("file_ref") REFERENCES "BlobRef"("ref") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Caption" ADD CONSTRAINT "Caption_video_ref_fkey" FOREIGN KEY ("video_ref") REFERENCES "Video"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;
