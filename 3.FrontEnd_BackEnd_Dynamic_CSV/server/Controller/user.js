const express = require("express");
const db = require("../DB/dbConnection");
const bcrypt = require("bcryptjs");
const app = express();

//create user table
app.get("/usertable", (req, res) => {
  let sql =
    "CREATE TABLE allusers (id INT AUTO_INCREMENT PRIMARY KEY, fullname VARCHAR(255), email VARCHAR(255),DOB DATE,password VARCHAR(255))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    //console.log(result);
    res.send("users  Table created");
  });
});

//=============================> USER SignUp API <===================================

app.post("/register", async (req, res) => {
  const { fullname, email, dob, password } = req.body;

  db.query(
    "SELECT email FROM allusers WHERE email = ?",
    [email],
    (err, results) => {
      if (err) {
        console.log(error);
      }
      if (results.length > 0) {
        throw new Error("The email is already in use");
      }
    }
  );

  if (!fullname || !email || !dob || !password) {
    res.status(400);
    throw new Error("Please Enter all the Fields");
  }
  //hashing password

  const hashedPassword = await bcrypt.hash(password, 8);
  //console.log(hashedPassword);

  db.query(
    "INSERT INTO allusers SET ?",
    { fullname: fullname, email: email, dob: dob, password: hashedPassword },
    (err, results) => {
      if (err) throw err;
      res.send(results);
    }
  );
});

//=============================> login USER API <===================================

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  let sql = "SELECT * FROM allusers WHERE email = ? AND password = ? ";
  db.query(sql, [email, password], (err, result) => {
    if (err) throw err;

    if (result) {
      res.send(result);
    } else {
      console.log({ message: "Wrong Combination" });
    }
  });
});

/*
app.post("/login", async (req,res,next) =>{
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const [row] = await conn.execute(
            "SELECT * FROM `users` WHERE `email`=?",
            [req.body.email]
          );

        if (row.length === 0) {
            return res.status(422).json({
                message: "Invalid email address",
            });
        }

        const passMatch = await bcrypt.compare(req.body.password, row[0].password);
        if(!passMatch){
            return res.status(422).json({
                message: "Incorrect password",
            });
        }

        const theToken = jwt.sign({id:row[0].id},'the-super-strong-secrect',{ expiresIn: '1h' });

        return res.json({
            token:theToken
        });

    }
    catch(err){
        next(err);
    }
}
*/

//Route for login a user

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;

//   const sqlSearch = " SELECT * FROM allusers WHERE email = ?";
//    const search_query = mysql.format(sqlSearch,[req.body.email])

//   db.query(search_query,  async (err, result) => {

//     if (err) throw err;
//     if (result.length == 0) {
//     console.log("----->User does not exist")
//     res.sendStatus(404)
//     } else {
//       const hashedPassword = result[0].password

//       if(await bcrypt.compare(password,hashedPassword)){
//         res.send(`${user}`)
//       }
//     }
//   });
// });

//============================> Get all the users from table <=========================

app.get("/allusers", (req, res) => {
  let sql = "SELECT * FROM allusers";
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

module.exports = app;
