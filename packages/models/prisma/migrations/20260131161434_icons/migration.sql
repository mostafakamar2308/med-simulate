/*
  Warnings:

  - Added the required column `icon` to the `BodySystem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `ExaminationTechnique` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BodySystem" ADD COLUMN     "icon" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExaminationTechnique" ADD COLUMN     "icon" TEXT NOT NULL;
