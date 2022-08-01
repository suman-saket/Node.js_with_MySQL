// get the client
const mysql = require("mysql2");

// create the connection to database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "New_Project",
});

db.connect((err) => {
  if (err) throw err;
  console.log("DB Connected");
});

module.exports = db;
