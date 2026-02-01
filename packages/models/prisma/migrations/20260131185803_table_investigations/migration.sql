/*
  Warnings:

  - A unique constraint covering the columns `[tableDataId]` on the table `InvestigationResult` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tableDataId` to the `InvestigationResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InvestigationResult" ADD COLUMN     "tableDataId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "InvestigationTableData" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "investigationResultId" TEXT NOT NULL,

    CONSTRAINT "InvestigationTableData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "InvestigationTableData_id_key" ON "InvestigationTableData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "InvestigationTableData_investigationResultId_key" ON "InvestigationTableData"("investigationResultId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestigationResult_tableDataId_key" ON "InvestigationResult"("tableDataId");

-- AddForeignKey
ALTER TABLE "InvestigationResult" ADD CONSTRAINT "InvestigationResult_tableDataId_fkey" FOREIGN KEY ("tableDataId") REFERENCES "InvestigationTableData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
