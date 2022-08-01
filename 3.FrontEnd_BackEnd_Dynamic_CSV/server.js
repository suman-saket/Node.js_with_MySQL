const express = require("express");
var cors = require("cors");
var app = express();

//express.json() is a method inbuilt to recognize the incoming request object as a JSON Object.
app.use(express.json());

app.use(cors()); //used this to send information cross-platform.(like sending info from FE to BE)

//calling main route
app.use("/", require("./server/Routes/router"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`My server is running on ${PORT}`);
});
