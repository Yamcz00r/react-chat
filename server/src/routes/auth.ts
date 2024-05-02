import { Router } from "express";
import { createUser, loginUser, deleteUser, getUserData } from '../services/auth';
import { decryptToken } from '../middleware/jwt';
const router = Router();

router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/user', decryptToken, getUserData)
router.delete('/delete', decryptToken, deleteUser);

export default router;