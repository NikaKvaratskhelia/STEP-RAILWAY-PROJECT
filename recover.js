const email = document.getElementById("recoverEmail");
const form = document.querySelector("form");
const button = document.querySelector(".send-email");
const cooldownText = document.getElementById("cooldownText");

const cooldownSeconds = 60;
let cooldownTimer;

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newEmail = email.value.trim();

  fetch("https://api.everrest.educata.dev/auth/recovery", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: newEmail }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      alert("The recovery email was sent to this email.");
      startCooldown();
    })
    .catch((err) => {
      console.error("Recovery error:", err);
      alert("An error occurred. Please try again.");
    });
});

function startCooldown() {
  let timeLeft = cooldownSeconds;
  button.disabled = true;
  cooldownText.textContent = `Please wait ${timeLeft}s`;

  cooldownTimer = setInterval(() => {
    timeLeft--;
    cooldownText.textContent = `Please wait ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(cooldownTimer);
      button.disabled = false;
      cooldownText.textContent = "";
    }
  }, 1000);
}
