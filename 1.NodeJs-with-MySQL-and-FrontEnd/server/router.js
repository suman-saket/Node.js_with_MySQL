const express = require('express');
const app = express()


//calling routes

app.use("/", require("./user"));



module.exports = app;




