//========================================> login Form <==================================================

const loginForm = document.getElementById("user_login_form");
loginForm.addEventListener("submit", loginUser);

async function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // 👇️ clear input field
  document.getElementById("user_login_form").reset();

  const result = await fetch("http://localhost:5000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then((res) => res.json());
  window.alert("User Logged In");
  console.log(result);
}

function redirect() {
  window.location.href = "../public/menu.html";
}
