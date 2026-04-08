/*
  Warnings:

  - Changed the type of `label` on the `BodySystem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `type` on the `ExaminationFinding` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `label` on the `ExaminationTechnique` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BodySystemLabel" AS ENUM ('General', 'Cardiovascular', 'Respiratory', 'Abdomen', 'Neurological', 'Extremities');

-- CreateEnum
CREATE TYPE "ExaminationTechniqueLabel" AS ENUM ('Inspect', 'Palpate', 'Auscultate', 'Percuss');

-- CreateEnum
CREATE TYPE "ExaminationFindingType" AS ENUM ('img', 'audio', 'video', 'text');

-- AlterTable
ALTER TABLE "BodySystem" DROP COLUMN "label",
ADD COLUMN     "label" "BodySystemLabel" NOT NULL;

-- AlterTable
ALTER TABLE "ExaminationFinding" DROP COLUMN "type",
ADD COLUMN     "type" "ExaminationFindingType" NOT NULL;

-- AlterTable
ALTER TABLE "ExaminationTechnique" DROP COLUMN "label",
ADD COLUMN     "label" "ExaminationTechniqueLabel" NOT NULL;
