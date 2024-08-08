import express from 'express';
import { uploadFile, getAllFiles, getFilesByClassId, getFileById, deleteFile, downloadFile} from '../controllers/file.controller.js';
import multer from 'multer';
import adminMiddleware from '../middleware/adminMiddleware.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  })
  const upload = multer({ storage: storage });

router.post('/upload', adminMiddleware,upload.single('file'), uploadFile);
router.get('/', getAllFiles);
router.post('/download', downloadFile);
router.get('/class/:classId', getFilesByClassId);
router.get('/:id', getFileById);
router.delete('/:id', adminMiddleware,deleteFile);

export default router;