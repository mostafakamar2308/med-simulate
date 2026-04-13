/*
  Warnings:

  - You are about to drop the column `differntial` on the `Case` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "differntial",
ADD COLUMN     "differential" TEXT NOT NULL DEFAULT '';
