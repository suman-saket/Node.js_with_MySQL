const express = require('express')
var cors = require('cors')
var app = express()
 

//express.json() is a method inbuilt to recognize the incoming request object as a JSON Object.
//This method is called as a middleware in your app using code: app.use(express.json())
//YOU don't need express.json() and express.urlencoded() for GET Requests or Delete Requests .WE only need it for post and put requests
app.use(express.json());

app.use(cors())    //used this to send information cross-platform.(like sending info from FE to BE)



//calling main route
app.use("/", require("./server/router"));



app.listen('8080',()=>{
    console.log("My server is running on port 8080")
})
