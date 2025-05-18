const main = document.querySelector("main");

fetch("https://api.everrest.educata.dev/auth", {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
})
  .then((res) => res.json())
  .then((user) => {
    main.innerHTML = `
      <div class="userAvatar">
        <h1>${user.firstName} ${user.lastName}</h1>
        <img class="userPfp" src="${user.avatar}" alt="User Profile Picture" />
        <div class="altPfps">
          <img src="https://api.dicebear.com/6.x/lorelei/svg?seed=alt1" alt="Alt PFP 1" />
          <img src="https://api.dicebear.com/6.x/lorelei/svg?seed=alt2" alt="Alt PFP 2" />
          <img src="https://api.dicebear.com/6.x/lorelei/svg?seed=alt3" alt="Alt PFP 3" />
          <img src="https://api.dicebear.com/6.x/lorelei/svg?seed=alt4" alt="Alt PFP 4" />
          <img src="https://api.dicebear.com/6.x/lorelei/svg?seed=alt5" alt="Alt PFP 5" />
        </div>
        <p id="updateAvatarBtn">Update Your Avatar</p>
      </div>
      <div class="user-info-wrapper">
        <div class="userInfo">
          <h1>User Information</h1>
          <p>Age: ${user.age}</p>
          <p>Email: ${user.email}</p>
          <p>Address: ${user.address}</p>
          <p>ZIP Code: ${user.zipcode}</p>
          <p>Gender: ${user.gender}</p>
          <p>Phone Number: ${user.phone}</p>
          <p>Verified: ${user.verified}</p>
        </div>
        <div class="changePasswordDiv">
          <input type="password" id="oldPass" placeholder="Old Password">
          <input type="password" id="newPass" placeholder="New Password">
          <button id="changePassBtn">Change Password</button>
        </div>
      </div>
    `;

    const userPfp = document.querySelector(".userPfp");
    const altImgs = document.querySelectorAll(".altPfps img");

    altImgs.forEach((img) => {
      img.addEventListener("click", function () {
        altImgs.forEach((i) => i.classList.remove("active"));
        img.classList.add("active");
        userPfp.src = img.src;
      });
    });

    document
      .getElementById("updateAvatarBtn")
      .addEventListener("click", () => updateAvatar(user));

    const btn = document.getElementById("changePassBtn");

    btn.addEventListener("click", function () {
      setupPasswordChange();
    });
  });

function setupPasswordChange() {
  const oldPassword = document.getElementById("oldPass");
  const newPassword = document.getElementById("newPass");

  const oldVal = oldPassword.value.trim();
  const newVal = newPassword.value.trim();

  if (!oldVal || !newVal) {
    alert("Please fill out both password fields.");
    return;
  }

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
        throw new Error("Password change failed on Everrest");
      }
      return res.json();
    })
    .then((data) => {
      if (data.access_token) {
        sessionStorage.setItem("token", data.access_token);
      }

      if (!mockUserId) {
        console.warn("No mockUserId found in sessionStorage.");
        return;
      }

      fetch(
        `https://68137244129f6313e2114929.mockapi.io/registeredUsers/${mockUserId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: newVal }),
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to update password on MockAPI");
          }
          return res.json();
        })
        .then(() => {
          oldPassword.value = "";
          newPassword.value = "";

          fetch(
            "https://68137244129f6313e2114929.mockapi.io/adminNotifications",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                message: `User ID:${mockUserId} just changed account password! `,
                type: "changePassword",
                timestamp: new Date().toISOString(),
              }),
            }
          );
        })
        .catch((err) => {
          console.error("MockAPI update failed:", err);
        });
    })
    .catch((error) => {
      alert("Error: " + error.message);
    });
}

const mockUserId = sessionStorage.getItem("mockUserId");
function updateAvatar(data) {
  const updatedAvatar = {
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.age,
    email: data.email,
    address: data.address,
    phone: data.phone,
    zipcode: data.zipcode,
    avatar: document.querySelector(".userPfp").src,
    gender: data.gender,
  };

  fetch("https://api.everrest.educata.dev/auth/update", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body: JSON.stringify(updatedAvatar),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update avatar on Everrest");
      }
      return res.json();
    })
    .then(() => {
      const userId = sessionStorage.getItem("mockUserId");
      if (!userId) {
        throw new Error("MockAPI user ID not found in sessionStorage");
      }

      return fetch(
        `https://68137244129f6313e2114929.mockapi.io/registeredUsers/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAvatar),
        }
      );
    })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Failed to update avatar on MockAPI");
      }
      return res.json();
    })
    .then(() => {
      fetch("https://68137244129f6313e2114929.mockapi.io/adminNotifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `User ID:${mockUserId} just changed avatar! `,
          type: "changeData",
          timestamp: new Date().toISOString(),
        }),
      });
      window.location.reload();
    })
    .catch((error) => {
      console.error("Update error:", error);
    });
}
