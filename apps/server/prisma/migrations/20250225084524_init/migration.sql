/*
  Warnings:

  - A unique constraint covering the columns `[inviteCode]` on the table `Groups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Groups_inviteCode_key" ON "Groups"("inviteCode");
