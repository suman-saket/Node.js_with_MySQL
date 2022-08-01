const express = require('express');
const db = require('./dbConnection');
const router = express.Router();



router.get('/',(req,res)=>{
    res.send("Hello World")
})


//create user table
router.get('/createtable',(req,res)=>{
    let sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255),password VARCHAR(255))";
      db.query(sql,(err,result)=>{
       if(err) throw err
       console.log(result);
       res.send("User Table created")
      })
})



//Insert 1 data in user table

router.get('/insertdata', (req,res) =>{
    let sql = "INSERT INTO users (name,email,password) VALUES ('SAKET SUMAN','saket@gmail.com','saku')";
    db.query(sql,(err,result)=>{
        if(err) throw err
        res.send("1 User Record Inserted")
    });
});




//Insert multiple data in user table

router.get('/insertalldata' , (req,res)=>{
   let values = [
    ['John', 'john@yahoo.com','Highway'],
    ['Peter','Peter@gmail.com' ,'Lowstreet'],
    ['Amy', 'amy@hotmail.com','Apple'],
   ] 
   let sql = "INSERT INTO users (name,email,password) VALUES ?";
   db.query(sql,[values],(err,result)=>{
       if(err) throw err
       res.send(result.affectedRows +" "+"Number of rows inserted")
   });
});




//Get all the data from user table

router.get('/getalldata',(req,res)=>{
    let sql = "SELECT * FROM users";
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("POST fetched");
    })
})




//get data a sepecific user by _id

router.get('/getdata/:id',(req,res)=>{
    let sql = `SELECT * FROM users WHERE id =${req.params.id}`;
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result);
        res.send("User fetched by id");
    })
})




//Update user details using :id

router.get('/updatedata/:id',(req,res)=>{
    let sql = `UPDATE users SET name="saket" WHERE id= ${req.params.id}`
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result)
        res.send(`user ${req.params.id} name updated`)
    })

})




//delete a user using :id

router.get('/deleteuser/:id', (req,res) =>{
    let sql = `DELETE FROM users WHERE id = ${req.params.id}`
    db.query(sql,(err,result)=>{
        if(err) throw err;
        console.log(result)
        res.send(`user ${req.params.id} deleted`)
    })
})



module.exports = router;