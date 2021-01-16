import nanoid from '../config/nanoid';
import AWS from 'aws-sdk';
import { UploadedFile } from 'express-fileupload';

class FileService {
    static async uploadFile(file: UploadedFile, date: string, s3: AWS.S3, roomID?: string) {
        const id = roomID || nanoid();
        console.log(file);

        const params: AWS.S3.PutObjectRequest = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${id}/${file.name}`,
            Body: file.data,
            Metadata: {
                type: file.mimetype,
                uploadDate: date,
            },
        };
        const data = await s3.upload(params).promise();

        return { data, id };
    }

    static async getFiles(s3: AWS.S3, roomID: string) {
        const params: AWS.S3.ListObjectVersionsRequest = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Prefix: roomID + '/',
        };

        try {
            const data = await s3.listObjects(params).promise();
            const files = data.Contents;

            const result = files.map(async (file) => {
                const obj = await s3.getObject({ Bucket: process.env.AWS_BUCKET_NAME, Key: file.Key }).promise();
                const type = obj.Metadata.type;
                const uploadDate = obj.Metadata.uploadDate;

                return {
                    key: file.Key,
                    name: file.Key.split('/')[1],
                    uploadDate,
                    size: file.Size,
                    url: FileService.getFileUrl(file.Key),
                    type: type,
                };
            });

            const objects = await Promise.all(result);

            objects.sort((a, b) => {
                const aDate = new Date(a.uploadDate) as any;
                const bDate = new Date(b.uploadDate) as any;

                return bDate - aDate;
            });

            return objects;
        } catch (error) {
            throw error;
        }
    }

    static getFileUrl(key: string) {
        const prefix = `https://${process.env.AWS_BUCKET_NAME}.s3.eu-central-1.amazonaws.com`;
        return `${prefix}/${key}`;
    }

    static async deleteFile(key: string, s3: AWS.S3) {
        const params: AWS.S3.DeleteObjectRequest = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
        };

        try {
            return await s3.deleteObject(params).promise();
        } catch (error) {
            throw error;
        }
    }
}

export default FileService;
