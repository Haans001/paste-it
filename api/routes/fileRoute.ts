import FileService from '../services/FileService';
import express from 'express';
import s3 from '../config/aws-config';
import HttpError from '../utils/HttpError';
import upload from '../config/multer';
import FileController from '../controllers/FileController';

const router = express.Router();

const MAX_FILE_SIZE = 1024 * 1024 * 2;

/* GET home page. */
router.post('/upload', upload.single('target'), FileController.upload);

router.get('/get/:room_id', FileController.getRoomFiles);

router.delete('/delete/:key?', FileController.deleteFile);

export default router;
