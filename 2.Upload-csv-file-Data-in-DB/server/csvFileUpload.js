const express = require("express");
const app = express();
const multer = require("multer");
const db = require("./dbConnection");
var csv = require("csvtojson");



//@description  Create Table for Storing Data from CSV File (here, TABLE NAME = csvdata)
//route         GET/csvtable
//access        Public

app.get("/csvtable", (req, res) => {
  let sql = "CREATE TABLE csvdata(Name char(50),Age int, Address varchar(255))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("csvData Table created");
  });
});





//here diskStorage function accept an object with 2 values - destination and filename
//destination is a function that has access to the (req,file,cb)
//filename is a function that has acces to (req,file,cb)

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  //filename is use to determine what the file should be named inside
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});


//here ,In multer function we pass an object with few properties like storage properties
//The storage property takes a storage engine and this storage engine tell multer where and how to save our files.

const upload = multer({ storage: fileStorage }).single("docs");



//@description  Upload CSV File  and it's data will be stored in "csvdata" TABLE we created above.
//route         POST/upload
//access        Public

app.post("/upload", upload, (req, res) => {
  //console.log(req.file);

  //convert csvfile to jsonArray
  csv()
    .fromFile(req.file.path)
    .then((source) => {
      // Fetching the data from each row and inserting to the table "userdata"
      for (var i = 0; i < source.length; i++) {
        var Name = source[i]["Name"],
          Age = source[i]["Age"],
          Address = source[i]["Address"];

        var sql = `INSERT INTO csvdata values (?,?,?)`;   //SQl query for inserting values in table named csvdata.

        var items = [Name, Age, Address];

        //Inserting data of current row into database
        db.query(sql, items, (err, result, fields) => {
          if (err) {
            console.log("Unable to insert item at row", i + 1);
            return console.log(err);
          }
        });
      }
      console.log("All items stored in db successfully");
    });
  res.send("CSV File Data saved in DB");
});



//@description  To Get all data saved in "csvdata" table of DataBase
//route         POST/getcsvdata
//access        Public

app.get("/getcsvdata", (req, res) => {
  let sql = "SELECT * FROM csvdata";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


module.exports = app;
