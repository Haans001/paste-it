/* eslint import/first: 0 */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import fileRoute from './routes/fileRoute';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use('/file', fileRoute);

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
