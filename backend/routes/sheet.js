const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: "uploads/" });

const { getUserDetails, createUser } = require('../controllers/sheetController');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');


router.route('/:mssv').get(catchAsyncErrors(getUserDetails));
router.route('/').post(upload.array("images"), catchAsyncErrors(createUser));

module.exports = router;