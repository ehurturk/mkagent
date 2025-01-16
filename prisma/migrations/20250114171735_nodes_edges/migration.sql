-- AlterTable
ALTER TABLE `Workflow` ADD COLUMN `edges` JSON NULL,
    ADD COLUMN `nodes` JSON NULL;
