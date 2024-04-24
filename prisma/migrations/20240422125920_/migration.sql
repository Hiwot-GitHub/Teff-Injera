/*
  Warnings:

  - Added the required column `amharicname` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menuitem` ADD COLUMN `amharicname` VARCHAR(255) NOT NULL;
