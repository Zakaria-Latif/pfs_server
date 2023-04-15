/*
  Warnings:

  - You are about to drop the column `fullName` on the `player` table. All the data in the column will be lost.
  - Added the required column `email` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `player` DROP COLUMN `fullName`,
    ADD COLUMN `email` VARCHAR(191) NOT NULL,
    MODIFY `location` VARCHAR(191) NULL,
    MODIFY `verificationToken` VARCHAR(191) NULL,
    MODIFY `resetToken` VARCHAR(191) NULL,
    MODIFY `playerStatisticsId` INTEGER NULL;
