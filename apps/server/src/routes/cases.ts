import { findCases } from "@/handlers/case";
import { Router } from "express";

const router = Router();

router.get("/list", findCases);
export default router;
