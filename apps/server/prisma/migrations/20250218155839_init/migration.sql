/*
  Warnings:

  - You are about to drop the column `fullName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_username_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "fullName",
DROP COLUMN "gender",
DROP COLUMN "username",
ADD COLUMN     "email" VARCHAR(191) NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "oauth_id" TEXT,
ADD COLUMN     "provider" VARCHAR(100),
ALTER COLUMN "password" DROP NOT NULL,
ALTER COLUMN "profilePic" DROP NOT NULL;

-- DropEnum
DROP TYPE "Gender";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
