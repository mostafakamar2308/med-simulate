import { sendMessage } from "@/handlers/chat";
import { Router } from "express";

const router = Router();

router.post("/", sendMessage);
export default router;
