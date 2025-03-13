/*
  Warnings:

  - You are about to drop the column `authorId` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `publishDate` on the `news` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `news` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `news` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_authorId_fkey";

-- AlterTable
ALTER TABLE "news" DROP COLUMN "authorId",
DROP COLUMN "content",
DROP COLUMN "publishDate",
ADD COLUMN     "createdBy" TEXT NOT NULL,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
