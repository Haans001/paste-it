/* eslint import/first: 0 */
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import logger from 'morgan';
import cors from 'cors';
import fileRoute from './routes/fileRoute';
import errorHandler from './utils/errorHandler';

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/file', fileRoute);
app.use(errorHandler);

const server = app.listen(process.env.PORT || 5001, () => {
    console.log(`Server is running`);
});

module.exports = app;
