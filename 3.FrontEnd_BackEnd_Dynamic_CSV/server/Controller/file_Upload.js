const express = require("express");
const app = express();
const mysql = require("mysql2");
const fs = require("fs");
const { parse } = require("csv-parse");
const async = require("async");
const multer = require("multer");
const db = require("../DB/dbConnection");
var csvHeaders = require("csv-headers");
// var cors = require("cors");
// app.use(cors());

// Function to read csv which returns a promise so you can do async / await.
// const tblnm = req.file.originalname;

const tblnm = process.argv[2];

//File Upload Middleware

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "__" + file.originalname);
  },
});

const upload = multer({ storage: fileStorage }).single("docs");

app.post("/upload", upload, (req, res) => {
  //const tblnm = req.file.originalname;
  new Promise((resolve, reject) => {
    csvHeaders(
      {
        file: req.file.path,
        delimiter: ",",
      },
      function (err, headers) {
        if (err) reject(err);
        else resolve({ headers });
        //console.log(headers);
      }
    );
  })
    .then((context) => {
      console.log(context);
      return new Promise((resolve, reject) => {
        context.db = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "1234",
          database: "new_project",
        });
        context.db.connect((err) => {
          if (err) {
            console.error("error connecting: " + err.stack);
            reject(err);
          } else {
            resolve(context);
          }
        });
      });
    })
    .then((context) => {
      return new Promise((resolve, reject) => {
        context.db.query(`DROP TABLE IF EXISTS ${tblnm}`, [], (err) => {
          if (err) reject(err);
          else resolve(context);
        });
      });
    })

    .then((context) => {
      return new Promise((resolve, reject) => {
        var fields = "";
        var fieldnms = "";
        var queries = "";

        context.headers.forEach((hdr) => {
          hdr = hdr.replace(" ", "_");
          if (hdr)
            if (fields !== "")
              // console.log(hdr);
              fields += ",";

          //console.log(fields);

          if (fieldnms !== "") fieldnms += ",";

          if (queries !== "") queries += ",";
          fields += `${hdr} varchar(255)`;
          //console.log(fields);
          fieldnms += `${hdr}`;

          queries += "?";
          //console.log(queries);
          // console.log(hdr);
        });
        context.queries = queries;
        // console.log(queries);
        context.fieldnms = fieldnms;
        //console.log(fieldnms);
        context.db.query(
          `CREATE TABLE IF NOT EXISTS ${tblnm} ( ${fields})`,
          [],
          (err) => {
            if (err) reject(err);
            else resolve(context);
            console.log("Table is created");
          }
        );
      });
    })
    .then((context) => {
      return new Promise((resolve, reject) => {
        fs.createReadStream(req.file.path).pipe(
          parse(
            {
              delimiter: ",",
              columns: true,
              relax_column_count: true,
            },
            (err, data) => {
              if (err) return reject(err);
              async.eachSeries(
                data,
                (datum, next) => {
                  // console.log(`about to run INSERT INTO ${tblnm} ( ${context.fieldnms} ) VALUES ( ${context.qs} )`);
                  var d = [];
                  try {
                    context.headers.forEach((hdr) => {
                      // In some cases the data fields have embedded blanks,which must be trimmed off
                      let tp = datum[hdr].trim();
                      // For a field with an empty string, send NULL instead
                      d.push(tp === "" ? null : tp);
                    });
                  } catch (e) {
                    console.error(e.stack);
                  }
                  // console.log(`${d.length}: ${util.inspect(d)}`);
                  if (d.length > 0) {
                    context.db.query(
                      `INSERT INTO ${tblnm} ( ${context.fieldnms} ) VALUES ( ${context.queries} )`,
                      d,
                      (err) => {
                        if (err) {
                          console.error(err);
                          next(err);
                        } else
                          setTimeout(() => {
                            next();
                          });
                      }
                    );
                  } else {
                    console.log(
                      `empty row ${util.inspect(datum)} ${util.inspect(d)}`
                    );
                    next();
                  }
                },
                (err) => {
                  if (err) reject(err);
                  else resolve(context);
                }
              );
            }
          )
        );
      });
    })
    .then((context) => {
      context.db.end();
    })
    .catch((err) => {
      console.error(err.stack);
    });
  res.send("CSV File Data saved in DB");
});

//@description GET Route
// localhost:3000/alldata

app.get("/alldata", upload, (req, res) => {
  //const tblnm = req.file.originalname;
  //   db = mysql.createConnection({
  //     host: "localhost",
  //     user: "root",
  //     password: "1234",
  //     database: "leadsemanticdb",
  //   });
  let sql = `SELECT * FROM ${tblnm} `;

  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

console.log("Saket");

module.exports = app;
