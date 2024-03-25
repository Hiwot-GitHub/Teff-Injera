/*
  Warnings:

  - You are about to drop the column `paymentMode` on the `customer` table. All the data in the column will be lost.
  - Added the required column `address` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `customer` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `paymentMode` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `customer` DROP COLUMN `paymentMode`,
    ADD COLUMN `address` VARCHAR(191) NOT NULL,
    ADD COLUMN `firstName` VARCHAR(191) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `order` ADD COLUMN `deliveryTimeSlot` DATETIME(3) NULL,
    ADD COLUMN `paymentMode` ENUM('CASH', 'MOBILEMONEY') NOT NULL;
