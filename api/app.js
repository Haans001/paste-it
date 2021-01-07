const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const fileUpload = require('express-fileupload');
var path = require('path');
const fileRoute = require('./routes/fileRoute');

const app = express();

const dir = __dirname.replace(/\\/g, '/');
global._root = path.resolve(dir);

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    fileUpload({
        createParentPath: true,
    })
);

app.use('/', fileRoute);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
