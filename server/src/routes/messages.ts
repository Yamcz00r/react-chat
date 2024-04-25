import { Router } from "express";
import { decryptToken } from '../middleware/jwt';
import { sendMessage } from "../services/messages";
const router = Router();

router.post('/send', decryptToken, sendMessage);

export default router;