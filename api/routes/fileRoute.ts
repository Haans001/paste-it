import FileService from '../services/FileService';
import express from 'express';
import { storage } from '../config/firebase';
import { UploadedFile } from 'express-fileupload';

const router = express.Router();

const MAX_FILE_SIZE = 1024 * 1024 * 2;

/* GET home page. */
router.post('/upload', async (req, res) => {
    const files = req.files;
    const roomID = req.body.room_id;

    if (!files) {
        return res.status(404).json({ message: 'File not found' });
    }

    const file = files.target as UploadedFile;

    if (file) {
        if (file.size > MAX_FILE_SIZE) {
            return res.status(403).json({ message: 'File is too large' });
        } else {
            try {
                const result = await FileService.uploadFile(file, storage, roomID);
                console.log(result);
            } catch (error) {
                console.error(error);
                return res.status(403).json({ message: 'There was a problem with your file' });
            }

            return res.status(200).json({ message: 'success' });
        }
    } else {
        return res.status(403).json({ message: 'There was a problem with your file' });
    }
});

router.get('/get/:room_id', async (req, res) => {
    const roomID = req.params.room_id;
    try {
        const data = await FileService.getFiles(storage, roomID);
        return res.status(200).json({ message: 'success', data });
    } catch (error) {
        console.log(error);
        return res.status(403).json({ message: 'There was a problem with your file' });
    }
});

router.post('/delete', async (req, res) => {
    const roomID = req.body.room_id;
    console.log(roomID);

    return res.status(200).json({ message: 'success' });
});

export default router;
