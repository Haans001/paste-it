import FileService from '../../services/FileService';
import { mocked } from 'ts-jest/utils';
import S3 from '../../config/aws-config';
import { ListObjectsOutput, ManagedUpload } from 'aws-sdk/clients/s3';
import { PromiseResult } from 'aws-sdk/lib/request';
import { AWSError } from 'aws-sdk';

jest.mock('../../config/aws-config');

const mockedS3 = mocked(S3, true);

describe('Testing File Service ...', () => {
    describe('Testing getFileUrl()', () => {
        test('should return correct url', () => {
            const key = '/asd123axc';
            const value = FileService.getFileUrl(key);

            expect(value).toBe(`https://${process.env.AWS_BUCKET_NAME}.s3.eu-central-1.amazonaws.com/${key}`);
        });
    });

    describe('Testing uploadFile()', () => {
        const file: any = {
            buffer: Buffer.from('Test file'),
            mimetype: 'mime/type',
            originalname: 'file.name',
        };

        const nanoid = () => {
            return 'ghq35fxoy0';
        };

        test('should return correct data and be called with correct arguments', async () => {
            const file: any = {
                buffer: Buffer.from('Test file'),
                mimetype: 'mime/type',
                originalname: 'file.name',
            };

            const id = nanoid();
            const key = `${id}/${file.originalname}`;
            const date = new Date().toUTCString();

            const resolveData: ManagedUpload.SendData = {
                Key: key,
                Location: `https://${process.env.AWS_BUCKET_NAME}.s3.eu-central-1.amazonaws.com/${key}`,
                Bucket: process.env.AWS_BUCKET_NAME,
                ETag: '',
            };

            mockedS3.upload.mockReturnValueOnce({
                promise: () => Promise.resolve(resolveData),
                abort: null,
                on: null,
                send: null,
            });

            const result = await FileService.uploadFile(file, mockedS3, nanoid, new Date().toUTCString());
            const args = mockedS3.upload.mock.calls[0][0];

            expect(mockedS3.upload).toBeCalled();
            expect(result.data).toEqual(resolveData);
            expect(result.id).toBe(id);
            expect(args.Key).toBe(key);
            expect(args.Body).toEqual(file.buffer);
        });

        test('should throw an error when promise rejected', async () => {
            mockedS3.upload.mockReturnValueOnce({
                promise: () => Promise.reject(new Error('Error')),
                abort: null,
                on: null,
                send: null,
            });

            const result = FileService.uploadFile(file, mockedS3, nanoid, new Date().toUTCString());
            await expect(result).rejects.toThrowError();
        });
    });

    describe('Testing getFiles()', () => {
        test('should return correctly ordered data', async () => {
            // const objects: PromiseResult<ListObjectsOutput, AWSError> = {
            //     Contents: [{ Key: 'das123azxca/fileA.name' }],

            // };

            mockedS3.listObjects.mockReturnValueOnce({});
        });
    });
});
