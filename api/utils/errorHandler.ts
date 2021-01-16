import { Request, Response, NextFunction } from 'express';
import { MulterError } from 'multer';
import HttpError from './HttpError';

export default (error, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';

    // Multer file size error
    if (error.code === 'LIMIT_FILE_SIZE') {
        return response.status(403).json({
            message: 'File is too large',
        });
    }

    return response.status(status).json({
        message,
        data: error.data,
    });
};
