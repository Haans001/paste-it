import { Request, Response, NextFunction } from 'express';
import HttpError from './HttpError';

export default (error: HttpError, request: Request, response: Response, next: NextFunction) => {
    const status = error.status || 500;
    const message = error.message || 'Something went wrong';
    response.status(status).json({
        message,
        data: error.data,
    });
};
