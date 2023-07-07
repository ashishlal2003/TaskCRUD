import express from 'express';
import { getUserInfo, updateUserInfo, getAllUsers } from '../controllers/user.js';

const router = express.Router();

router.get('/me', getUserInfo);
router.put('/me', updateUserInfo);

router.get('/all', getAllUsers);

export default router;