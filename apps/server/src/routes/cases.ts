import { findCaseById, findCases } from "@/handlers/case";
import { Router } from "express";

const router = Router();

router.get("/list", findCases);
router.get("/:id", findCaseById);
export default router;
