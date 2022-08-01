// get the client
const mysql = require('mysql2');


// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'1234',
  database: "school"
});


db.connect(err =>{;
    if(err) throw err 
    console.log("DB Connected")
    let sql = "CREATE DATABASE school";
    db.query(sql,(err) =>{
        if(err){
            throw err;
        }
        console.log("Database created")
    })

})



module.exports = db;