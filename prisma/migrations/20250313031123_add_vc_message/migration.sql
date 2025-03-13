-- CreateTable
CREATE TABLE "vc_message" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "imageUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vc_message_pkey" PRIMARY KEY ("id")
);
