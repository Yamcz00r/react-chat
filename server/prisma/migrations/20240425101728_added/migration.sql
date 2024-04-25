/*
  Warnings:

  - Added the required column `timestamp` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Message` ADD COLUMN `timestamp` DATETIME(3) NOT NULL;
