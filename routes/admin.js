import express from 'express';
import { all } from '../controllers/admin.js';
import { getAllUsers } from '../controllers/user.js';

const router = express.Router();

router.get('/allUsers', getAllUsers);
router.get('/all', all);

export default router;