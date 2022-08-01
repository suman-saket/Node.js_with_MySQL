
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




//Fetching Data and showing It on Clicking Button

document.getElementById("button").addEventListener("click",
async function fillData(){
   let table =document.querySelector('table')
   const tableHead = table.querySelector('thead')
   const tableBody = table.querySelector('tbody')
   const response = await fetch('http://localhost:8080/getalldatas');
   const data = await response.json();


  console.log(data);

  //clear out table 
  tableHead.innerHTML = "<tr></tr>";
  tableBody.innerHTML = "";

  //populating header

  for(const headerText in data[0]){
     const HeaderElement = document.createElement("th")
     HeaderElement.textContent = headerText;
     tableHead.querySelector('tr').appendChild(HeaderElement);
  }

  for(let i=0;i<data.length;i++){
     const obj = Object.values(data[i]);
     const rowElement =  document.createElement("tr");
     for(const cellText of obj){
        const cellElement =  document.createElement('td');
        cellElement.textContent = cellText;
        rowElement.appendChild(cellElement);
     }
     tableBody.appendChild(rowElement);
  }

}
)




/*

//Fetching Data and showing It on Clicking Button 
//But here i was showing only table data dynamically

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

*/