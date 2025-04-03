/*
  Warnings:

  - You are about to drop the column `uid` on the `Pages` table. All the data in the column will be lost.
  - Added the required column `email` to the `Pages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pages" DROP CONSTRAINT "Pages_uid_fkey";

-- AlterTable
ALTER TABLE "Pages" DROP COLUMN "uid",
ADD COLUMN     "email" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Pages" ADD CONSTRAINT "Pages_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
