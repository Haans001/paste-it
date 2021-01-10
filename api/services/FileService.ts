import nanoid from '../utils/nanoid';
import { Bucket } from '@google-cloud/storage';
import { format } from 'util';

import { UploadedFile } from 'express-fileupload';

class FileService {
    static async uploadFile(file: UploadedFile, storage: Bucket, roomID?: string) {
        return new Promise((resolve, reject) => {
            const id = roomID || nanoid();
            const blob = storage.file(`${id}/${file.name}`);
            const blobStream = blob.createWriteStream();
            blobStream.on('error', (err) => {
                reject(err);
            });

            blobStream.on('finish', () => {
                const publicUrl = format(
                    `https://storage.googleapis.com/${storage.name}/${blob.name}`
                );
                console.log(publicUrl);
                resolve(true);
            });

            blobStream.end(file.data);
        });
    }

    static async getFiles(storage: Bucket, roomID: string) {
        console.log(roomID);

        const [files] = await storage.getFiles({
            prefix: roomID + '/',
        });

        const data = files.map((file) => file.publicUrl());

        return data;
    }
}

export default FileService;
