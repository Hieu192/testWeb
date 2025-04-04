const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
require('dotenv').config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: (origin, callback) => {
        callback(null, origin || '*'); // Chấp nhận tất cả origin
    },
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
}));

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });
const user = require("./routes/user");
const sheet = require("./routes/sheet");

app.use("/api/v1/user", user);
app.use("/api/v1/sheet", sheet);

app.use((error, req, res, next) => {
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        stack: error.stack,
        message: error.message || 'Internal Server Error'
    })
})

module.exports = app;