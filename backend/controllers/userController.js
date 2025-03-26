const User = require('../models/user.model');
const { BadRequestError } = require('../core/error.response');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');

exports.createUser = async (req, res, next) => {
    const mssv = req.body.mssv;
    if (!mssv) {
        throw new BadRequestError(`Please enter your student code`);
    }
    const checkUser = await User.findOne({mssv: mssv});
    if (checkUser) {
        throw new BadRequestError(`User already exists with this student code: ${mssv}`);
    }
    const newUser = await User.create(req.body);

    res.status(201).json({
        success: true,
        newUser
    })
}
exports.getUserDetails = async (req, res, next) => {
    console.log("test:::", req.params.mssv);
    const user = await User.findOne({mssv: req.params.mssv});

    if (!user) {
        throw new BadRequestError(`User not found with this ID: ${req.params.mssv}`);
    }

    res.status(200).json({
        success: true,
        user
    })
}