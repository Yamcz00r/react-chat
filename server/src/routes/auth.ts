import { Router, Response } from "express";
import { createUser, loginUser, deleteUser, getUserData } from '../services/auth';
import { AuthorizationRequest } from "../middleware/jwt";
import { decryptToken } from '../middleware/jwt';
const router = Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/user/:id', decryptToken, getUserData)
router.delete('/delete/:id', deleteUser);

export default router;