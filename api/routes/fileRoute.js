const express = require('express');
const app = require('../app');

const router = express.Router();

const MAX_FILE_SIZE = 1024 * 1024 * 2;

/* GET home page. */
router.post('/upload', (req, res) => {
    const file = req.files.target;

    if (file) {
        console.log(file);
        if (file.size > MAX_FILE_SIZE) {
            return res.status(403).json({ message: 'File is too large' });
        } else {
            return res.status(200).json({ message: 'success' });
        }
    } else {
        return res.status(403).json({ message: 'There was a problem with your file' });
    }
});

module.exports = router;
