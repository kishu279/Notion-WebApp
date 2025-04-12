/*
  Warnings:

  - You are about to drop the column `content` on the `Pages` table. All the data in the column will be lost.
  - You are about to drop the column `private` on the `Pages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Pages" DROP COLUMN "content",
DROP COLUMN "private",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "parentPageId" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "Contents" (
    "cid" TEXT NOT NULL,
    "pid" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contents_pkey" PRIMARY KEY ("cid")
);

-- AddForeignKey
ALTER TABLE "Pages" ADD CONSTRAINT "Pages_parentPageId_fkey" FOREIGN KEY ("parentPageId") REFERENCES "Pages"("pid") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contents" ADD CONSTRAINT "Contents_pid_fkey" FOREIGN KEY ("pid") REFERENCES "Pages"("pid") ON DELETE RESTRICT ON UPDATE CASCADE;
