-- CreateTable
CREATE TABLE "Investigation" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "guidance" TEXT,
    "caseId" TEXT NOT NULL,
    "investigationResultId" TEXT NOT NULL,

    CONSTRAINT "Investigation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestigationResult" (
    "id" TEXT NOT NULL,
    "reference" TEXT,
    "value" TEXT,
    "imageUrl" TEXT,
    "description" TEXT NOT NULL,

    CONSTRAINT "InvestigationResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Investigation_id_key" ON "Investigation"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Investigation_investigationResultId_key" ON "Investigation"("investigationResultId");

-- CreateIndex
CREATE UNIQUE INDEX "InvestigationResult_id_key" ON "InvestigationResult"("id");

-- AddForeignKey
ALTER TABLE "Investigation" ADD CONSTRAINT "Investigation_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investigation" ADD CONSTRAINT "Investigation_investigationResultId_fkey" FOREIGN KEY ("investigationResultId") REFERENCES "InvestigationResult"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
