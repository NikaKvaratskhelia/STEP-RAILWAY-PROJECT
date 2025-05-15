const signUpName = document.getElementById("signUpName");
const signUpLastname = document.getElementById("signUpLastname");
const signUpAge = document.getElementById("signUpAge");
const signUpEmail = document.getElementById("signUpEmail");
const signUpPassword = document.getElementById("signUpPassword");
const signUpAddress = document.getElementById("signUpAddr");
const signUpPhone = document.getElementById("signUpPhone");
const signUpZIP = document.getElementById("signUpZIP");
const signUpAvatar = "https://api.dicebear.com/7.x/pixel-art/svg?seed=Jane";
const signUpGender = document.getElementById("signUpGender");
const signUpForm = document.querySelector(".signUpForm");

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  newUser = {
    firstName: signUpName.value.trim(),
    lastName: signUpLastname.value.trim(),
    age: signUpAge.value.trim(),
    email: signUpEmail.value.trim(),
    password: signUpPassword.value.trim(),
    address: signUpAddress.value.trim(),
    phone: signUpPhone.value.trim(),
    zipcode: signUpZIP.value.trim(),
    avatar: signUpAvatar,
    gender: signUpGender.value.trim(),
  };

  fetch("https://api.everrest.educata.dev/auth/sign_up", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  })
    .then((res) => res.json())
    .then((data) => {
      sessionStorage.setItem("newUser", JSON.stringify(data));
    });
});
