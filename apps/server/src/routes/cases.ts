import {
  findCaseById,
  findCases,
  linkToFinding,
  linkToInvestigationResult,
} from "@/handlers/case";
import { Router } from "express";

const router = Router();

router.get("/list", findCases);
router.get("/:id", findCaseById);
router.post("/links/finding/:findingId/media/:mediaId", linkToFinding);
router.post(
  "/links/investigation-result/:resultId/media/:mediaId",
  linkToInvestigationResult,
);

export default router;
