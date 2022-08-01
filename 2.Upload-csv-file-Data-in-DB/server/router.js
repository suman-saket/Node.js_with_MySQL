const express = require('express');
const app = express()


//calling csvfile upload routes

app.use("/", require("./csvFileUpload"));


module.exports = app;


