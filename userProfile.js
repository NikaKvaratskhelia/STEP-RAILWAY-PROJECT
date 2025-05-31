const mockUserId = sessionStorage.getItem("mockUserId");
const userName = document.getElementById("userName");
const userEmail = document.getElementById("userEmail");
const userPhone = document.getElementById("userPhone");
const userImg = document.getElementById("userImg");
const alertDiv = document.getElementById("alertDiv");
const inputFirstName = document.getElementById("firstName");
const inputLastName = document.getElementById("lastName");
const inputPhone = document.getElementById("phone");
const inputAge = document.getElementById("age");

function setupPasswordChange() {
  const oldPassword = document.getElementById("oldPass");
  const newPassword = document.getElementById("newPass");

  const oldVal = oldPassword.value.trim();
  const newVal = newPassword.value.trim();

  const updatedPassword = {
    oldPassword: oldVal,
    newPassword: newVal,
  };
  fetch(`https://api.everrest.educata.dev/auth/change_password`, {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(updatedPassword),
  })
    .then((res) => {
      if (!res.ok) {
        showAlert("An Error Occurred While Updating Data", "red");
        return Promise.reject("Update failed");
      }
      showAlert("Profile Updated Successfully", "green");
      return res.json();
    })
    .then((data) => {
      if (data.access_token) {
        sessionStorage.setItem("token", data.access_token);
      }

      const mockUserId = sessionStorage.getItem("mockUserId");
      if (!mockUserId) {
        console.warn("No mockUserId found in sessionStorage.");
        return;
      }

      return fetch(
        `https://68137244129f6313e2114929.mockapi.io/registeredUsers/${mockUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newVal }),
        }
      );
    })
    .then((res) => {
      if (res && !res.ok) {
        throw new Error("Failed to update password on MockAPI");
      }
      return res?.json();
    })
    .then(() => {
      oldPassword.value = "";
      newPassword.value = "";

      const mockUserId = sessionStorage.getItem("mockUserId");

      fetch("https://68137244129f6313e2114929.mockapi.io/adminNotifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `User ID:${mockUserId} just changed account password!`,
          type: "changePassword",
          timestamp: new Date().toISOString(),
        }),
      });
    })
    .catch((err) => {
      console.error("Password update failed:", err);
      showAlert("An Error Occurred While Updating Data", "red");
    });
}

function fetchUserInfo() {
  fetch("https://api.everrest.educata.dev/auth", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      sessionStorage.setItem("userData", JSON.stringify(data));
      userEmail.textContent = data.email;
      userName.textContent = `${data.firstName + " " + data.lastName}`;
      userPhone.textContent = data.phone;
      userImg.src = data.avatar;
      inputFirstName.placeholder = data.firstName;
      inputLastName.placeholder = data.lastName;
      inputPhone.placeholder = data.phone;
      inputAge.placeholder = data.age;
    });
}

function updateData() {
  let userData = JSON.parse(sessionStorage.getItem("userData"));
  let updatedUser = {
    firstName: inputFirstName.value.trim() || userData.firstName,
    lastName: inputLastName.value.trim() || userData.lastName,
    age: inputAge.value.trim() || userData.age,
    email:userData.email,
    address: userData.address,
    phone: inputPhone.value.trim() || userData.phone,
    zipcode: userData.zipcode,
    avatar: userData.avatar,
    gender: userData.gender,
  };

  console.log(updatedUser)
  fetch("https://api.everrest.educata.dev/auth/update", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(updatedUser),
  }).then((response) => {
    if (!response.ok) {
      showAlert("An error Occured While Updating Data", "red");
    }
    if (response.ok) {
      showAlert("Profile Updated Successfully", "green");
      fetchUserInfo()
    }
  });
}

function showAlert(message, color) {
  const alertDiv = document.getElementById("alertDiv");
  alertDiv.innerHTML = message;
  alertDiv.style.backgroundColor = color;
  alertDiv.style.bottom = "30px";
  alertDiv.style.opacity = "1";

  setTimeout(() => {
    alertDiv.style.bottom = "-100px";
    alertDiv.style.opacity = "0";
  }, 2000);
}

fetchUserInfo()