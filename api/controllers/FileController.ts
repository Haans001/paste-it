import { Request, Response, NextFunction } from 'express';
import FileService from '../services/FileService';
import HttpError from '../utils/HttpError';
import s3 from '../config/aws-config';

class FileController {
    public static async upload(req: Request, res: Response, next: NextFunction) {
        const file = req.file;
        const roomID = req.body.room_id;
        const date = req.body.date;

        if (!file) {
            return next(new HttpError(404, 'File not found'));
        }

        try {
            const { data, id } = await FileService.uploadFile(file, date, s3, roomID);
            return res.status(200).json({ message: 'success', data, id });
        } catch (error) {
            console.error(error);
            return next(new HttpError(error.code, 'There was a problem with your file'));
        }
    }

    public static async getRoomFiles(req: Request, res: Response, next: NextFunction) {
        const roomID = req.params.room_id;
        try {
            const data = await FileService.getFiles(s3, roomID);
            return res.status(200).json({ message: 'success', data });
        } catch (error) {
            console.log(error);
            return next(new HttpError(403, 'There was a problem with your file'));
        }
    }

    public static async deleteFile(req: Request, res: Response, next: NextFunction) {
        const key = req.query.key as string;

        if (!key) {
            return next(new HttpError(404, 'Enter valid file name'));
        }

        try {
            const data = await FileService.deleteFile(key, s3);
            return res.status(200).json({ message: 'success', data: data });
        } catch (error) {
            console.log(error);
            return next(new HttpError(403, 'Error Occured'));
        }
    }
}

export default FileController;
