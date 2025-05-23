const signInEmail = document.getElementById("signInEmail");
const signInPassword = document.getElementById("signInPass");
const form = document.querySelector(".signInForm");
const recover = document.getElementById("recover");
const signUpStatus = document.getElementById("signUpStatus");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const userDetails = {
    email: signInEmail.value.trim(),
    password: signInPassword.value.trim(),
  };

  if (
    signInEmail.value.trim() === "admin@gmail.com" &&
    signInPassword.value.trim() === "admin123"
  ) {
    sessionStorage.setItem("isAdmin", "true");
    window.location.href = "Homepage.html";
  } else {
    sessionStorage.setItem("isAdmin", "false");

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
          fetch("https://68137244129f6313e2114929.mockapi.io/registeredUsers")
            .then((res) => res.json())
            .then((mockUsers) => {
              const userExistsInMock = mockUsers.find(
                (user) =>
                  user.email === signInEmail.value.trim() 
              );

              if (userExistsInMock) {
                signUpStatus.innerHTML = "<p>Sign In Successful!</p>";
                signUpStatus.style.backgroundColor = "rgba(58, 226, 58, 0.49)";
                sessionStorage.setItem("token", data.access_token);
                sessionStorage.setItem("mockUserId", userExistsInMock.id);

                fetch(
                  "https://68137244129f6313e2114929.mockapi.io/adminNotifications",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      message: `${
                        userExistsInMock.firstName || "A user"
                      } signed in.`,
                      type: "signIn",
                      timestamp: new Date().toISOString(),
                    }),
                  }
                );

                setTimeout(() => {
                  window.location.href = "Homepage.html";
                }, 1000);
              } else {
                signUpStatus.innerHTML = `<p>Sign In failed: User not authorized.</p>`;
                signUpStatus.style.backgroundColor = "#cc4949a9";
              }
            })
            .catch((err) => {
              signUpStatus.innerHTML = `<p>Sign In failed: Unable to verify user.</p>`;
              signUpStatus.style.backgroundColor = "#cc4949a9";
              console.error(err);
            });
        } else {
          signUpStatus.innerHTML = `<p>Sign In failed!</p>`;
          signUpStatus.style.backgroundColor = "#cc4949a9";
        }
      })
      .catch((err) => {
        signUpStatus.innerHTML = `<p>Sign In Failed</p>`;
        signUpStatus.style.backgroundColor = "#cc4949a9";
        console.error(err);
      });
  }
});

recover.addEventListener("click", function () {
  window.location.href = "recover.html";
});
