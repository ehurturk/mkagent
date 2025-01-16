/*
  Warnings:

  - Made the column `edges` on table `Workflow` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nodes` on table `Workflow` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Workflow` MODIFY `edges` JSON NOT NULL DEFAULT ('[]'),
    MODIFY `nodes` JSON NOT NULL DEFAULT ('[]');
