import { sendMessageStream } from "@/handlers/chat-v2";
import { Router } from "express";

const router = Router();

router.post("/", sendMessageStream);
export default router;
