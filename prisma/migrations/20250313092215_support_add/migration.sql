-- CreateEnum
CREATE TYPE "SupportStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'RESOLVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "SupportCategory" AS ENUM ('IT', 'ELECTRICAL', 'PLUMBING', 'CARPENTRY', 'CLEANING', 'SECURITY', 'OTHER');

-- CreateTable
CREATE TABLE "supports" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "designation" TEXT NOT NULL,
    "instituteOffice" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "buildingName" TEXT,
    "roomNumber" TEXT,
    "mobileNumber" TEXT,
    "problemDescription" TEXT NOT NULL,
    "attachmentUrl" TEXT,
    "status" "SupportStatus" NOT NULL DEFAULT 'PENDING',
    "category" "SupportCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "supports_pkey" PRIMARY KEY ("id")
);
