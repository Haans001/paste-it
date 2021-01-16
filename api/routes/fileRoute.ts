import FileService from '../services/FileService';
import express from 'express';
import { UploadedFile } from 'express-fileupload';
import s3 from '../config/aws-config';
import HttpError from '../utils/HttpError';
import upload from '../config/multer';

const router = express.Router();

const MAX_FILE_SIZE = 1024 * 1024 * 2;

/* GET home page. */
router.post('/upload', upload.single('target'), async (req, res, next) => {
    const file = req.file;
    const roomID = req.body.room_id;
    const date = req.body.date;

    if (!file) {
        return next(new HttpError(404, 'File not found'));
    }

    if (file) {
        if (file.size > MAX_FILE_SIZE) {
            return res.status(403).json({ message: 'File is too large' });
        } else {
            try {
                const { data, id } = await FileService.uploadFile(file, date, s3, roomID);
                return res.status(200).json({ message: 'success', data, id });
            } catch (error) {
                console.error(error);
                return next(new HttpError(error.code, 'There was a problem with your file'));
            }
        }
    } else {
        return next(new HttpError(403, 'There was a problem with your file'));
    }
});

router.get('/get/:room_id', async (req, res, next) => {
    const roomID = req.params.room_id;
    try {
        const data = await FileService.getFiles(s3, roomID);
        return res.status(200).json({ message: 'success', data });
    } catch (error) {
        console.log(error);
        return next(new HttpError(403, 'There was a problem with your file'));
    }
});

router.delete('/delete/:key?', async (req, res, next) => {
    const key = req.query.key as string;

    if (!key) {
        return next(new HttpError(404, 'Enter valid file name'));
    }

    try {
        const data = await FileService.deleteFile(key, s3);
        return res.status(200).json({ message: 'success', data: data });
    } catch (error) {
        console.log(error);
        return next(new HttpError(403, 'Enter Occured'));
    }
});

export default router;
