import {
  listFiles,
  uploadFile,
  deleteFile,
  getFile,
  updateFile,
} from "@/handlers/media";
import { upload } from "@/middlewares/fileValidation";
import { uploadLimiter } from "@/middlewares/rateLimiter";
import { Router } from "express";

const router = Router();

router.post("/upload", uploadLimiter, upload.single("media"), uploadFile);
router.get("/files", listFiles);
router.get("/files/:id", getFile);
router.put("/files/:id", updateFile);
router.delete("/files/:id", deleteFile);
export default router;
