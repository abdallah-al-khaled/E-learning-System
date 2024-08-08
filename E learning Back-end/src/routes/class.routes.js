import express from 'express';
import {
  createClass,
  getAllClasses,
  getClassById,
  updateClass,
  deleteClass,
  enrollClass,
  getUsersClasses
} from '../controllers/class.controller.js';
import adminMiddleware from '../middleware/adminMiddleware.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/', getUsersClasses);

router.get('/', getAllClasses);
router.get('/:id', getClassById);
router.post('/add',authMiddleware, createClass);
router.delete('/:id', adminMiddleware, deleteClass);
router.post('/:classId/enroll', authMiddleware,enrollClass);


export default router;