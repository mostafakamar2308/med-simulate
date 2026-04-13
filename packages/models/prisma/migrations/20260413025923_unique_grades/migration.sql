/*
  Warnings:

  - A unique constraint covering the columns `[studentId,caseId,section]` on the table `GradingAttempt` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GradingAttempt_studentId_caseId_section_key" ON "GradingAttempt"("studentId", "caseId", "section");
