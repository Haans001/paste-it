const express = require('express');
const app = require('../app');

const router = express.Router();

/* GET home page. */
router.post('/upload', (req, res) => {
    const file = req.files.target;

    if (file) {
        console.log(file);
        console.log(file.size > 1024 * 1024 * 1);
    }

    return res.status(200).json({ message: 'success' });
});

module.exports = router;
