const express = require('express')
var cors = require('cors')
var app = express()
 
app.use(express.json());
app.use(cors())


//calling main route
app.use("/", require("./server/router"));



app.listen('8080',()=>{
    console.log("My server is running on port 8080")
})
