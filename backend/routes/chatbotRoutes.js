import express from 'express';
import { getMenuSuggestions } from '../controllers/chatbotController.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

router.get('/suggestions', authMiddleware, getMenuSuggestions);

export default router;