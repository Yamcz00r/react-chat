import { Router } from "express";
import { decryptToken } from '../middleware/jwt';
import { sendMessage, deleteMessage, editMessage } from "../services/messages";
const router = Router();

router.post('/send', decryptToken, sendMessage);
router.put('/edit/:id', decryptToken, editMessage);
router.delete('/delete/:id', decryptToken, deleteMessage);

export default router;