/*
  Warnings:

  - You are about to drop the column `email` on the `Pages` table. All the data in the column will be lost.
  - Added the required column `uid` to the `Pages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pages" DROP CONSTRAINT "Pages_email_fkey";

-- AlterTable
ALTER TABLE "Pages" DROP COLUMN "email",
ADD COLUMN     "uid" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pages" ADD CONSTRAINT "Pages_uid_fkey" FOREIGN KEY ("uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
