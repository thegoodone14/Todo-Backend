import express from 'express';
import { getOrCreateList } from '../controllers/listController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/unique', authenticateToken, getOrCreateList);

export default router;