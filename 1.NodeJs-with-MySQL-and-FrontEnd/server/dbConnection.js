// get the client
const mysql = require('mysql2');


// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'1234',
  database: "leadsemanticdb"
});


//creation of db
db.connect(err =>{;
    if(err) throw err 
    console.log("DB Connected")
    let sql = "CREATE DATABASE leadsemanticdb";
    db.query(sql,(err) =>{
        if(err){
            throw err;
        }
        console.log("Database created")
    })

})

module.exports = db;



// //create db

// app.get("/createdb",(req,res)=>{
//     let sql = "CREATE DATABASE leadsemanticdb";
//     db.query(sql,(err) =>{
//         if(err){
//             throw err;
//         }
//         res.send("database created")
//     })

// })

