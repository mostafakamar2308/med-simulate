import { Router } from "express";
import {
  gradeHistory,
  gradeExam,
  gradeInvestigations,
  gradeDiagnosis,
} from "@/handlers/grading";
import { authenticate } from "@/middlewares/auth";

const router = Router();

router.use(authenticate);

router.post("/history", gradeHistory);
router.post("/exam", gradeExam);
router.post("/investigations", gradeInvestigations);
router.post("/diagnosis", gradeDiagnosis);

export default router;
