/*
  Warnings:

  - A unique constraint covering the columns `[video_cid]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `video_cid` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "video_cid" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_video_cid_key" ON "Post"("video_cid");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_video_cid_fkey" FOREIGN KEY ("video_cid") REFERENCES "Video"("cid") ON DELETE RESTRICT ON UPDATE CASCADE;
