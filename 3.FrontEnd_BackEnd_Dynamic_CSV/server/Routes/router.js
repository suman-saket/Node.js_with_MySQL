const express = require("express");
const app = express();

//calling routes

app.use("/", require("../Controller/user"));
app.use("/", require("../Controller/file_Upload"));

module.exports = app;
