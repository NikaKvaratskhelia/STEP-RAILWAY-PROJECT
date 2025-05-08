const myForm = document.querySelector(".my-form");
const textInput = document.getElementById("textInput");
const chosenSeatIDs = JSON.parse(localStorage.getItem("chosenSeatIDs"));
const ticketId = localStorage.getItem("ticket-id");
const container = document.querySelector(".container");
const cardOwner = localStorage.getItem("cardOwner");
const cardNumber = localStorage.getItem("cardNum");
const passengersCount = localStorage.getItem("passengerCount");
const theTrain = JSON.parse(localStorage.getItem("theTrain"));
const georgianFullDate = localStorage.getItem("georgianFullDate");
const passEmail = localStorage.getItem("passEmail");
const passPhoneNum = localStorage.getItem("passPhoneNum");
const ticket = JSON.parse(localStorage.getItem("ticket"));
console.log(ticket);
const passengersInfo = ticket.people;
const ticketinfo = document.querySelector(".ticket-info");
const total = localStorage.getItem("total");
const today = new Date();
const formattedDate = `${
  today.getMonth() + 1
}-${today.getDate()}-${today.getFullYear()}`;
const deleteTicket = document.querySelector(".delete-ticket");
const errorDiv = document.querySelector(".error");

deleteTicket.addEventListener("click", function () {
  fetch(
    `https://railway.stepprojects.ge/api/tickets/cancel/${localStorage.getItem(
      "ticketId"
    )}`,
    {
      method: "DELETE",
    }
  )
    .then((res) => res.text())
    .then(() => {
      container.style.display = "none";
      errorDiv.style.display = "flex";
      errorDiv.innerHTML = "<p>ბილეთი წარმატებით წაიშალა!</p>";
    })
    .catch((error) => {
      errorDiv.style.display = "flex";
      errorDiv.innerHTML = "<p>ბილეთი ვერ წაიშალა!</p>";
      console.error("Error:", error);
    });
});

myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const ticketId = textInput.value.trim();
  localStorage.setItem("ticketId", ticketId);
  fetch(`https://railway.stepprojects.ge/api/tickets/checkstatus/${ticketId}`)
    .then((res) => res.json())
    .then((data) => {
      container.style.display = "flex";
      ticketinfo.innerHTML = `
    <div class="company-name">
        <p>Step Railway</p>
        <img src="Images/stepLogo.jpg" alt="Step Logo" />
    </div>
    
    <div class="ticket-id-date">
        <p><span>ბილეთის ნომერი:</span> ${ticketId.replace(
          "ბილეთი წარმატებით დაიჯავშნა. ბილეთის ნომერია:",
          ""
        )}</p>
    
        <p><span>გაცემის თარიღი:</span> ${formattedDate}</p>
    </div>
    
    <div class="train-info">
        <div>
            <p>გასვლა:</p>
            <p>${theTrain.departure}</p>
        </div>
        <div>
            <p>ჩასვლა:</p>
            <p>${theTrain.arrive}</p>
        </div>
        <div>
            <p>გასვლის თარიღი:</p>
            <p>${georgianFullDate}</p>
        </div>
    </div>
    
    <div class="contact-info">
        <p>საკონტაქტო ინფორმაცია:</p>
        <div>
            <p><span>იმეილი:</span> ${passEmail}</p>
            <p><span>ნომერი:</span> ${passPhoneNum}</p>
        </div>
    </div>

    <div class="passengers-div">
    <p>მგზავრები</p>
        <div class='passengers-info'>
        
        </div>
    </div> 
    
    <div class="payment-info">
      <div class='total'>
      <p>სულ გადახდილი:</p>
        <p>${total}₾</p>
      </div>
    </div>

    <div class="invoice-copyright">
      <p>ინვოისი იქმნება კომპიუტერის მიერ და ვალიდურია ბეჭედის და ხელმოწერის გარეშე</p>
      <p>გადმოწერეთ ბილეთი ან შეინახეთ ბილეთის ნომერი ადგილზე წარსადგენად.<p>
    </div>
    `;
    })
    .catch((error) => {
      container.style.display = "none";
      errorDiv.style.display = "flex";
      errorDiv.innerHTML =
        "<p>ასეთი ბილეთი არ მოიძებნა, შეამოწმეთ ბილეთის ნომერი</p>";
      console.log(error);
    });
});
