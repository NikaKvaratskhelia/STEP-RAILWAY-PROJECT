if (sessionStorage.getItem("isAdmin") === "false") {
  window.location.href = "Homepage.html";
}

document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector("#userTable tbody");
  const noUsers = document.getElementById("noUsers");

  function loadUsers() {
    fetch("https://68137244129f6313e2114929.mockapi.io/registeredUsers")
      .then((res) => res.json())
      .then((users) => {
        tableBody.innerHTML = "";
        if (users.length === 0) {
          noUsers.innerHTML = "No One Is Registered On your Web Site!";
        } else {
          users.forEach((user) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${user.id}</td>
            <td><img src="${user.avatar}" alt="user avatar"/></td>
              <td>${user.firstName} ${user.lastName}</td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
              <td>${user.zipcode}</td>
              <td><button class="btn btn-danger" data-id="${user.id}">Delete</button></td>
            `;
            tableBody.appendChild(row);
          });

          document.querySelectorAll(".btn-danger").forEach((btn) => {
            btn.addEventListener("click", () => {
              const id = btn.getAttribute("data-id");
              const userName = btn.closest("tr").children[1].textContent;
              if (confirm(`Are you sure you want to delete ${userName}?`)) {
                fetch(
                  `https://68137244129f6313e2114929.mockapi.io/registeredUsers/${id}`,
                  {
                    method: "DELETE",
                  }
                )
                  .then(() => {
                    loadUsers();

                    fetch(
                      "https://68137244129f6313e2114929.mockapi.io/adminNotifications",
                      {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          message: `You deleted ${userName}'s account`,
                          type: "delete",
                          timestamp: new Date().toISOString(),
                        }),
                      }
                    );

                    fetchNotifications();
                  })
                  .catch(() => alert("Failed to delete user"));
              }
            });
          });
        }
      })
      .catch(() => {
        tableBody.innerHTML =
          "<tr><td colspan='6'>Error loading users.</td></tr>";
      });
  }

  loadUsers();
});

function fetchNotifications() {
  fetch("https://68137244129f6313e2114929.mockapi.io/adminNotifications")
    .then((res) => res.json())
    .then((notifications) => {
      const list = document.getElementById("notificationList");
      list.innerHTML = "";

      if (notifications.length === 0) {
        const li = document.createElement("li");
        li.innerHTML = "NO notifications yet!";
        list.appendChild(li);
      } else {
        notifications.reverse().forEach((n) => {
          const li = document.createElement("li");
          li.textContent = `${n.message} (${new Date(
            n.timestamp
          ).toLocaleString()})`;
          list.appendChild(li);
        });
      }
    });
}

setInterval(() => {
    fetchNotifications();
}, 10000);
    

fetchNotifications()