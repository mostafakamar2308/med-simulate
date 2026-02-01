/*
  Warnings:

  - You are about to drop the column `tableDataId` on the `InvestigationResult` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "InvestigationResult" DROP CONSTRAINT "InvestigationResult_tableDataId_fkey";

-- DropIndex
DROP INDEX "InvestigationResult_id_key";

-- DropIndex
DROP INDEX "InvestigationResult_tableDataId_key";

-- DropIndex
DROP INDEX "InvestigationTableData_id_key";

-- DropIndex
DROP INDEX "InvestigationTableData_investigationResultId_key";

-- AlterTable
ALTER TABLE "InvestigationResult" DROP COLUMN "tableDataId";

-- AlterTable
ALTER TABLE "InvestigationTableData" ALTER COLUMN "value" SET DATA TYPE DOUBLE PRECISION;

-- AddForeignKey
ALTER TABLE "InvestigationTableData" ADD CONSTRAINT "InvestigationTableData_investigationResultId_fkey" FOREIGN KEY ("investigationResultId") REFERENCES "InvestigationResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
