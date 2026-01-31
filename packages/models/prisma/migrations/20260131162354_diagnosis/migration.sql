/*
  Warnings:

  - Added the required column `diagnosis` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" ADD COLUMN     "diagnosis" TEXT NOT NULL,
ALTER COLUMN "objective" DROP DEFAULT,
ALTER COLUMN "actor" DROP DEFAULT,
ALTER COLUMN "briefHistory" DROP DEFAULT;
