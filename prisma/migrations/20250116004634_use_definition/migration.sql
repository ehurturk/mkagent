/*
  Warnings:

  - You are about to drop the column `edges` on the `Workflow` table. All the data in the column will be lost.
  - You are about to drop the column `nodes` on the `Workflow` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Workflow` DROP COLUMN `edges`,
    DROP COLUMN `nodes`;
