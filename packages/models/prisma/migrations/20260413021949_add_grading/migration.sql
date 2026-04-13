-- CreateEnum
CREATE TYPE "GradingSection" AS ENUM ('HISTORY', 'EXAM', 'INVESTIGATIONS', 'DIAGNOSIS');

-- CreateTable
CREATE TABLE "GradingAttempt" (
    "id" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "section" "GradingSection" NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "feedback" TEXT NOT NULL,
    "rawResponse" JSONB,
    "missingItems" TEXT[],
    "isCorrect" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GradingAttempt_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "GradingAttempt_id_caseId_idx" ON "GradingAttempt"("id", "caseId");
