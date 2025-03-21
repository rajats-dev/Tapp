/*
  Warnings:

  - Added the required column `memberName` to the `GroupMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupMessage" ADD COLUMN     "memberName" TEXT NOT NULL;
