import { Router } from "express";
import { decryptToken } from "../middleware/jwt";
import {
  getConversationForUser,
  createConversation,
  deleteConversation,
} from "../services/conversation";
const router = Router();

router.get("/", decryptToken, getConversationForUser);
router.post("/create", decryptToken, createConversation);
router.delete("/delete/:id", deleteConversation);

export default router;
