const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPass");
const form = document.querySelector(".signInForm");
const recover = document.getElementById("recover");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  userDetails = {
    email: signInEmail.value.trim(),
    password: signInPassword.value.trim(),
  };

  fetch("https://api.everrest.educata.dev/auth/sign_in", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userDetails),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.access_token) {
        sessionStorage.setItem("token", data.access_token);
        window.location.href = "Homepage.html";
      } else {
        alert("Sign-in failed: " + (data.message || "Invalid credentials"));
      }
    })
    .catch((err) => {
      alert("An error occurred. Please try again.");
      console.error(err);
    });
});

recover.addEventListener("click", function () {
  window.location.href = "recover.html";
});
