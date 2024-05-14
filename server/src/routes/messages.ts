import { Router } from "express";
import { decryptToken } from "../middleware/jwt";
import { sendMessage, editMessage } from "../services/messages";
const router = Router();

router.post("/send", decryptToken, sendMessage);
router.put("/edit/:msgId", decryptToken, editMessage);

export default router;
