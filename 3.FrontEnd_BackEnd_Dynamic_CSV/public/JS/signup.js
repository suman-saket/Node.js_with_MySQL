// Create user registration of different user.
// create user name email dob(in calender)
// Login Page
// Show some Menu after login like uplaod data Set.
// Menu item - Show the list of tables .Put samall icon where diffrent data set should be dislayed

console.log("Script Start");

//==========================> Sign-Up Form Logic <====================================

const form = document.getElementById("user_signup_form");
form.addEventListener("submit", registerUser);

async function registerUser(event) {
  event.preventDefault();

  const fullname = document.getElementById("fullname").value;
  const email = document.getElementById("email").value;
  const dob = document.getElementById("dob").value;
  const password = document.getElementById("password").value;

  // 👇️ clear input field
  document.getElementById("user_signup_form").reset();

  const result = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fullname,
      email,
      dob,
      password,
    }),
  }).then((res) => res.json());
  window.alert("Details Submitted");
  console.log(result);
}

function redirect() {
  window.location.href = "../public/login_page.html";
}
