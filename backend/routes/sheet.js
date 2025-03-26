const express = require('express');
const router = express.Router();

const { getUserDetails, createUser } = require('../controllers/sheetController');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');


router.route('/:mssv').get(catchAsyncErrors(getUserDetails));
router.route('/').post(catchAsyncErrors(createUser));

module.exports = router;