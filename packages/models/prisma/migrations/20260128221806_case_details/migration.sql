-- CreateTable
CREATE TABLE "BodySystem" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "caseId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BodySystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExaminationTechnique" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "bodySystemId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ExaminationTechnique_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExaminationArea" (
    "id" TEXT NOT NULL,
    "examinationTechniqueId" TEXT NOT NULL,

    CONSTRAINT "ExaminationArea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExaminationFinding" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "normal" BOOLEAN,
    "description" TEXT NOT NULL,
    "areaId" TEXT NOT NULL,

    CONSTRAINT "ExaminationFinding_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BodySystem_id_key" ON "BodySystem"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExaminationTechnique_id_key" ON "ExaminationTechnique"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExaminationArea_id_key" ON "ExaminationArea"("id");

-- CreateIndex
CREATE UNIQUE INDEX "ExaminationFinding_id_key" ON "ExaminationFinding"("id");

-- AddForeignKey
ALTER TABLE "BodySystem" ADD CONSTRAINT "BodySystem_caseId_fkey" FOREIGN KEY ("caseId") REFERENCES "Case"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExaminationTechnique" ADD CONSTRAINT "ExaminationTechnique_bodySystemId_fkey" FOREIGN KEY ("bodySystemId") REFERENCES "BodySystem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExaminationArea" ADD CONSTRAINT "ExaminationArea_examinationTechniqueId_fkey" FOREIGN KEY ("examinationTechniqueId") REFERENCES "ExaminationTechnique"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExaminationFinding" ADD CONSTRAINT "ExaminationFinding_areaId_fkey" FOREIGN KEY ("areaId") REFERENCES "ExaminationArea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
