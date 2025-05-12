const chosenSeatIDs = JSON.parse(localStorage.getItem("chosenSeatIDs"));
const ticketId = localStorage.getItem("ticket-id");

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


function maskCardNumberWithSpaces(cardNumber) {
  const digitsOnly = cardNumber.replace(/\s+/g, '');
  if (digitsOnly.length < 4) return cardNumber;

  const firstTwo = digitsOnly.slice(0, 2);
  const lastTwo = digitsOnly.slice(-2);
  const masked = firstTwo + '*'.repeat(digitsOnly.length - 4) + lastTwo;
  const maskedWithSpaces = masked.replace(/(.{4})/g, '$1 ').trim();
  return maskedWithSpaces;
}



document.addEventListener("DOMContentLoaded", function () {
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
      <div class="card-info">
        <div>
          <p>Payment Info:</p>
          <p>${cardOwner}</p>
        </div>

        <div>
          <p>Credit Card:</p>
          <p>${maskCardNumberWithSpaces(cardNumber)}</p>
        </div>
        
      </div>

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

  const passengersDiv = document.querySelector(".passengers-info");

  passengersDiv.innerHTML = "";
  console.log(passengersInfo);
  passengersInfo.forEach((passenger) => {
    fetch(`https://railway.stepprojects.ge/api/seat/${passenger.seatId}`)
      .then((res) => res.json())
      .then((data) => {
        passengersDiv.innerHTML += `
          <div class="pass-container">
              <div>
                  <p>სახელი:</p>
                  <p>${passenger.name}</p>
              </div>
  
              <div>
                  <p>გვარი:</p>
                  <p>${passenger.surname}</p>
              </div>
  
              <div>
                  <p>პირადი ნომერი:</p>
                  <p>${passenger.idNumber}</p>
              </div>
  
              <div>
                  <p>ადგილი:</p>
                  <p>${data.number}</p>
              </div>
  
              <div>
                  <p>ვაგონის N:</p>
                  <p>${data.vagonId}</p>
              </div>
          </div>
        `;
      });
  });
});
