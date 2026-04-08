/*
  Warnings:

  - You are about to drop the column `created_at` on the `BodySystem` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `BodySystem` table. All the data in the column will be lost.
  - You are about to drop the column `areaId` on the `ExaminationFinding` table. All the data in the column will be lost.
  - You are about to drop the column `created_at` on the `ExaminationTechnique` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `ExaminationTechnique` table. All the data in the column will be lost.
  - Added the required column `label` to the `ExaminationArea` table without a default value. This is not possible if the table is not empty.
  - Added the required column `examinationAreaId` to the `ExaminationFinding` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExaminationFinding" DROP CONSTRAINT "ExaminationFinding_areaId_fkey";

-- AlterTable
ALTER TABLE "BodySystem" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AlterTable
ALTER TABLE "ExaminationArea" ADD COLUMN     "label" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExaminationFinding" DROP COLUMN "areaId",
ADD COLUMN     "examinationAreaId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "ExaminationTechnique" DROP COLUMN "created_at",
DROP COLUMN "updated_at";

-- AddForeignKey
ALTER TABLE "ExaminationFinding" ADD CONSTRAINT "ExaminationFinding_examinationAreaId_fkey" FOREIGN KEY ("examinationAreaId") REFERENCES "ExaminationArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
