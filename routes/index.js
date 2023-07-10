import express from 'express';
import taskRoutes from './tasks.js';
import authRoutes from './auth.js';
import userRoutes from './users.js';
import { checkAuth } from '../utils/checkAuth.js';
import adminRoutes from './admin.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', checkAuth, userRoutes);
router.use('/tasks', checkAuth, taskRoutes);
router.use('/admin', adminRoutes);
export default router;