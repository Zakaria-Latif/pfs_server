/*
  Warnings:

  - You are about to drop the column `description` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `match` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `match` table. All the data in the column will be lost.
  - You are about to drop the `movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `moviecomment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playersNumber` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prize` to the `Match` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Match` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `moviecomment` DROP FOREIGN KEY `MovieComment_movieId_fkey`;

-- DropForeignKey
ALTER TABLE `moviecomment` DROP FOREIGN KEY `MovieComment_userId_fkey`;

-- AlterTable
ALTER TABLE `match` DROP COLUMN `description`,
    DROP COLUMN `title`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `creatorId` INTEGER NOT NULL,
    ADD COLUMN `duration` DOUBLE NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `playersNumber` INTEGER NOT NULL,
    ADD COLUMN `prize` VARCHAR(191) NOT NULL,
    ADD COLUMN `time` DATETIME(3) NOT NULL;

-- DropTable
DROP TABLE `movie`;

-- DropTable
DROP TABLE `moviecomment`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `PlayerStatistics` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rate` DOUBLE NOT NULL DEFAULT 0,
    `matchesNumber` INTEGER NOT NULL DEFAULT 0,
    `favoritePosition` VARCHAR(191) NOT NULL,
    `playerId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `PlayerStatistics_playerId_key`(`playerId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Player` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fullName` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `verificationToken` VARCHAR(191) NOT NULL,
    `resetToken` VARCHAR(191) NOT NULL,
    `resetExpiration` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NULL DEFAULT '',
    `playerStatisticsId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MatchToPlayer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rate` DOUBLE NOT NULL,
    `position` VARCHAR(191) NOT NULL,
    `playerId` INTEGER NOT NULL,
    `matchId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `MatchToPlayer_playerId_matchId_key`(`playerId`, `matchId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Group` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `GroupToPlayer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerId` INTEGER NOT NULL,
    `groupId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `GroupToPlayer_playerId_groupId_key`(`playerId`, `groupId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Message` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(191) NOT NULL,
    `groupId` INTEGER NOT NULL,
    `senderId` INTEGER NOT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PlayerStatistics` ADD CONSTRAINT `PlayerStatistics_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Match` ADD CONSTRAINT `Match_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchToPlayer` ADD CONSTRAINT `MatchToPlayer_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MatchToPlayer` ADD CONSTRAINT `MatchToPlayer_matchId_fkey` FOREIGN KEY (`matchId`) REFERENCES `Match`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupToPlayer` ADD CONSTRAINT `GroupToPlayer_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupToPlayer` ADD CONSTRAINT `GroupToPlayer_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Message` ADD CONSTRAINT `Message_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
