import { Router } from "express";
import {
  findCases,
  createCase,
  listCases,
  getCase,
  updateCase,
  deleteCase,
  updateFinding,
  getFindingForArea,
  addInvestigation,
  updateInvestigationResult,
  addTableData,
  linkToFinding,
  linkToInvestigationResult,
} from "@/handlers/case";

const router = Router();

router.get("/", findCases);
router.post("/", createCase);
router.get("/list", listCases);
router.get("/:id", getCase);
router.put("/:id", updateCase);
router.delete("/:id", deleteCase);

router.get("/areas/:id/finding", getFindingForArea);
router.put("/findings/:id", updateFinding);

router.post("/:id/investigations", addInvestigation);
router.put("/investigation-results/:id", updateInvestigationResult);
router.post("/investigation-results/:id/table-data", addTableData);

router.post("/links/finding/:findingId/media/:mediaId", linkToFinding);
router.post(
  "/links/investigation-result/:resultId/media/:mediaId",
  linkToInvestigationResult,
);

export default router;
