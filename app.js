const express = require('express');
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
)
    .then(() => console.log('DB connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

const { router } = require('./routes/post.js');

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(expressValidator());
app.use("/", router);

const port = process.env.PORT || 8080;
app.listen(port, () => { console.log(`API ${port}`) });