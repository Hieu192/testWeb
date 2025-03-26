const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter your name'],
        maxLength: [30, 'Your name cannot exceed 30 characters']
    },
    sdt: {
        type: String,
        required: [true, 'Please enter your phone number'],
        maxLength: [10, 'Your phone number cannot exceed 10 characters']
    },
    mssv: {
        type: String,
        required: [true, 'Please enter your student code'],
        maxLength: [10, 'Your student code cannot exceed 10 characters']
    },
    // email: {
    //     type: String,
    //     required: [true, 'Please enter your email'],
    //     unique: true,
    //     validate: [validator.isEmail, 'Please enter valid email address']
    // },
    // password: {
    //     type: String,
    //     select: false
    // },
    // avatar: {
    //     public_id: {
    //         type: String,
    //     },
    //     url: {
    //         type: String,
    //         required: true
    //     }
    // },
    // role: {
    //     type: String,
    //     default: 'user'
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // },
    // resetPasswordToken: String,
    // resetPasswordExpire: Date

})

module.exports = mongoose.model('User', userSchema);