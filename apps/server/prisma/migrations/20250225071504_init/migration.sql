/*
  Warnings:

  - Added the required column `memberName` to the `GroupMember` table without a default value. This is not possible if the table is not empty.
  - The required column `inviteCode` was added to the `Groups` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "GroupMember" ADD COLUMN     "memberName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Groups" ADD COLUMN     "inviteCode" TEXT NOT NULL;
