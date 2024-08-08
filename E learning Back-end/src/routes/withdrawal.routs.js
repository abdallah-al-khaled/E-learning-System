import express from 'express';
import { requestWithdrawal, getAllWithdrawals, approveWithdrawal, rejectWithdrawal } from '../controllers/withdraw.controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();
router.post('/request',authMiddleware, requestWithdrawal);
router.get('/', getAllWithdrawals);
router.put('/approve/:id',adminMiddleware, approveWithdrawal);
router.put('/reject/:id',adminMiddleware, rejectWithdrawal);
// withdrawal
export default router;
