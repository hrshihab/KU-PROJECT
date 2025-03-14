-- CreateEnum
CREATE TYPE "NOCType" AS ENUM ('NOC', 'GO');

-- CreateTable
CREATE TABLE "nocs" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" "NOCType" NOT NULL,
    "publishedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documentsUrl" TEXT NOT NULL,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "nocs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "nocs" ADD CONSTRAINT "nocs_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
