const submitBtn = document.getElementById("submitButton");
const input = document.getElementById("reviewInput");
const section = document.getElementById("reviews");

const mockUserId = sessionStorage.getItem("mockUserId");

fetch(
  `https://68137244129f6313e2114929.mockapi.io/registeredUsers/${mockUserId}`
)
  .then((res) => res.json())
  .then((data) => sessionStorage.setItem("data", JSON.stringify(data)));

const account = JSON.parse(sessionStorage.getItem("data"));

function addReview() {
  const newReview = {
    comment: input.value.trim(),
    avatar: account.avatar,
    firstName: account.firstName,
    lastName: account.lastName,
  };

  fetch("https://683b5e1c28a0b0f2fdc47ef9.mockapi.io/reviews", {
    method: "POST", 
    headers: {
      "Content-Type": "application/json", 
    },
    body: JSON.stringify(newReview),
  })
    .then((res) => {
      if (res.ok) {
        showAlert("Review Added Successfully", "green");
        input.value = "";
        loadReviews();
      } else {
        showAlert("Failed to add review", "red");
      }
    })
    .catch(() => {
      showAlert("Network error", "red");
    });
}

submitBtn.addEventListener("click", addReview);

function loadReviews() {
  fetch("https://683b5e1c28a0b0f2fdc47ef9.mockapi.io/reviews")
    .then((res) => res.json())
    .then((data) => {
      let div = "";
      data.forEach((review) => {
        div += `<div class="review">
            <img src="${review.avatar}" alt="User" />
        <div class="name">${review.firstName} ${review.lastName}</div>
        <div class="text">${review.comment}</div>
      </div>`;
      });
      section.innerHTML = div;
    });
}

loadReviews();

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
