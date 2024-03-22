/*
  Warnings:

  - You are about to alter the column `price` on the `menuitem` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,0)` to `Int`.

*/
-- AlterTable
ALTER TABLE `menuitem` MODIFY `price` INTEGER NOT NULL;
