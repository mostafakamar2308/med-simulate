/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `InvestigationResult` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "MediaFile" DROP CONSTRAINT "MediaFile_uploadedById_fkey";

-- AlterTable
ALTER TABLE "InvestigationResult" DROP COLUMN "imageUrl";

-- AlterTable
ALTER TABLE "MediaFile" ALTER COLUMN "uploadedById" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "MediaFile_displayName_idx" ON "MediaFile"("displayName");

-- AddForeignKey
ALTER TABLE "MediaFile" ADD CONSTRAINT "MediaFile_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
