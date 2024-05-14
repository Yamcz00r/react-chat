import { Router } from "express";
import {
  createUser,
  loginUser,
  deleteUser,
  getUserData,
  getUserByUsername,
} from "../services/auth";
import { decryptToken } from "../middleware/jwt";
const router = Router();

router.post("/create", createUser);
router.post("/login", loginUser);
router.get("/user", decryptToken, getUserData);
router.get("/search", getUserByUsername);
router.delete("/delete", decryptToken, deleteUser);

export default router;
