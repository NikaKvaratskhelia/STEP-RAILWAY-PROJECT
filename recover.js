const email = document.getElementById("recoverEmail");
const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();
    const newEmail = email.value.trim()
  fetch("https://api.everrest.educata.dev/auth/recovery", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: newEmail }),
  });
});
