const express = require('express');
const db = require('./dbConnection');
const app = express();




//create user table
app.get('/createuser',(req,res)=>{
    let sql = "CREATE TABLE userregistration (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(255), lastname VARCHAR(255),email VARCHAR(255))";  
    db.query(sql,(err,result)=>{
       if(err) throw err
       console.log(result);
       res.send("UserRegister Table created")
      })
})


//Route for  Registering a User

app.post("/registeruser", (req, res) => {

    const {firstname,lastname,email} = req.body;
    //console.log(req.body);
    let sql = "INSERT INTO userregistration(firstname,lastname,email) VALUES(?,?,?)";
     db.query(sql,[firstname,lastname,email],(err,results)=>{
        if(err) throw err;
        res.send(results)
    });
});


//route for getting all data from user table
app.get('/getalldatas',(req,res)=>{
    let sql = "SELECT * FROM userregistration";
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    })
})

module.exports = app;











/*

//Fetching Data and showing It on Clicking Button

document.getElementById("button").addEventListener("click",
function fetchData(){
   fetch('http://localhost:8080/getalldatas')
     .then(response =>{
        // console.log(response);
        if(!response.ok){
           throw Error("ERROR");
        }
        return response.json();
     })
     .then(data =>{
        const html = data.map((user)=>{
           
           return  ` 
                  <tr>
                     <td>${user.firstname}</td>
                     <td>${user.lastname}</td>
                     <td>${user.email}</td>
                  </tr> 
              `
            }).join("")
       //console.log(html);

        document.querySelector('#tabledata').innerHTML = html
        
     }).catch(error =>{
        console.log(error)
     })
       
  }
);






//Form action logic
const form = document.getElementById('customer_registration_form')
form.addEventListener('submit',registerUser);

async function registerUser(event){
   event.preventDefault();

   const firstname = document.getElementById('firstname').value;
   const lastname = document.getElementById('lastname').value;
   const email = document.getElementById('email').value;

   // 👇️ clear input field
   document.getElementById('customer_registration_form').reset();
   
   const result = await fetch('http://localhost:8080/registeruser',{
      method :'POST',
      headers:{
         'Content-Type':'application/json'
      },
      body:JSON.stringify({
         firstname,
         lastname,
         email
      })
   }).then((res) => res.json())
   window.alert("Details Submitted");
   console.log(result)
}

*/