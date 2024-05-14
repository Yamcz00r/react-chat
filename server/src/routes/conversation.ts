import { Router } from "express";
import { decryptToken } from "../middleware/jwt";
import {
  getConversationForUser,
  createConversation,
  deleteConversation,
  getConversation,
} from "../services/conversation";
const router = Router();

router.get("/", decryptToken, getConversationForUser);
router.get("/:chatId", getConversation);
router.post("/create", decryptToken, createConversation);
router.delete("/delete/:id", deleteConversation);

export default router;
