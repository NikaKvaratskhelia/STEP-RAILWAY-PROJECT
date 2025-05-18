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
const zipRegex = /^\d{4}$/;
const phoneRegex = /^\+\d{1,3}[-\s]?\d{3,14}([-\s]?\d{2,4})*$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const signUpStatus = document.getElementById("signUpStatus");

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault();
  let valid = true;
  if (!zipRegex.test(signUpZIP.value.trim())) {
    alert("ZIP code must be exactly 4 digits.");
    valid = false;
    return;
  }

  if (!phoneRegex.test(signUpPhone.value.trim())) {
    alert("Phone number must include country code and start with '+'.");
    valid = false;
    return;
  }

  if (!passwordRegex.test(signUpPassword.value.trim())) {
    alert("Weak Password! Please choose stronger one!");
    valid = false;
    return;
  }

  if (valid) {
    updatedData = {
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

    fetch("https://api.everrest.educata.dev/auth/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify(updatedData),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "An unexpected error occurred.");
        }
        return data;
      })
      .then((data) => {
        sessionStorage.setItem("newUser", JSON.stringify(data));
        signUpStatus.innerHTML = "<p>Successfully Update Data!</p>";
        signUpStatus.style.backgroundColor = "rgba(58, 226, 58, 0.49);";
        setTimeout(() => {
          window.location.href = "userProfile.html";
        }, 1000);
      })
      .catch((err) => {
        signUpStatus.innerHTML = `<p>Update Failed ${err.message}</p>`;
        signUpStatus.style.backgroundColor = "#cc4949a9";
      });
  }
});
