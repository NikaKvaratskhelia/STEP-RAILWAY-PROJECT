const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPass");
const form = document.querySelector(".signInForm");
const recover = document.getElementById("recover");
const signUpStatus = document.getElementById("signUpStatus");

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
        signUpStatus.innerHTML = "<p>Sign In Successfull!</p>";
        signUpStatus.style.backgroundColor = "rgba(58, 226, 58, 0.49);";
        sessionStorage.setItem("token", data.access_token);
        window.location.href = "Homepage.html";
      } else {
      signUpStatus.innerHTML = `<p>Sign In failed!</p>`
      signUpStatus.style.backgroundColor ="#cc4949a9"
      }
    })
    .catch((err) => {
      signUpStatus.innerHTML = `<p>Sign In Failed</p>`
      signUpStatus.style.backgroundColor ="#cc4949a9"
      console.error(err);
    });
});

recover.addEventListener("click", function () {
  window.location.href = "recover.html";
});
