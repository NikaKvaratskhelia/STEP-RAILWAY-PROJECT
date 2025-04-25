const bookingDiv = document.getElementById("book-trains");
const index = localStorage.getItem("indexOfBtn");
let trainsArray = JSON.parse(localStorage.getItem("trainsArray"));
console.log(trainsArray);

localStorage.setItem('theTrain', JSON.stringify(trainsArray[index]))
// Saving this so that in payment page i can reach this and take out the from and departure

bookingDiv.innerHTML = "";

bookingDiv.innerHTML = `

<div class="details-booking" id="details-booking">
          <div> 
            <h3>შეიყვანეთ თქვენი მონაცემები</h3>
            <div class="table-details-checkout">
              <div>
                <div>
                  <p>#${trainsArray[index].number}</p>
                  <p>
                  ${trainsArray[index].name}
                  Express</p>
                </div>
              </div>
              <div>
                <div>
                  <p>${trainsArray[index].departure}</p>
                  <p>${trainsArray[index].from}</p>
                </div>
              </div>
              <div>
                <div>
                  <p>${trainsArray[index].arrive}</p>
                  <p>${trainsArray[index].to}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="error">

          </div>
  
          <div>
            <h3>საკონტაქტო ინფორმაცია</h3>
  
            <div class="inputs-div">
              <input type="email" placeholder="იმეილი" class="emailInput" />
              <input type="tel" placeholder="ტელეფონის ნომერი" class="phoneInput"/>
            </div>
          </div>
  
          <div class="passengers-info-div-main">
            <h3>მგზავრების ინფორმაცია</h3>
  
            <div class="passengers-info-div">

            </div>
          </div> 
        </div>



        
        <div class="invoice">
          <h3>ინვოისი</h3>
          <table>
            <thead>
              <tr>
                <th>ადგილი</th>
                <th>ფასი</th>
              </tr>
            </thead>
            <tbody class="invoice-table-body">
              
            </tbody>
          </table>
  
          <div class="white-checkout-div">
            <p>სულ:</p>
            <p>0.00₾</p>
          </div>
  
          <div class="agree-rules">
            <input type="checkbox" id="agree" checked />
            <label for="agree">წავიკითხე და ვეთანხმები წესებს</label>
          </div>
  
          <button class="registration">ბილეთების რეგისტრაცია</button>
        </div>

        `;

const errorDiv = document.querySelector(".error");
const passengersInfo = document.querySelector(".passengers-info-div");
let count = Number(localStorage.getItem("passengerCount"));

passengersInfo.innerHTML = "";
let i = 1;
while (i <= count) {
  passengersInfo.innerHTML += `
                  <div>
                <h4>მგზავრი ${i}</h4>
                <div class="passengers">
                  <p>ადგილი: <span>0</span></p>

                  <input type="text" placeholder="სახელი" class="nameInput">
                  <input type="text" placeholder="გვარი" class="lastNameInput">
                  <input type="text" placeholder="პირადი ნომერი" class="privateNum">

                  <button class="chooseSeat">ადგილის არჩევა</button>
                </div>
              </div>
              `;

  i++;
}

const email = document.getElementsByClassName("emailInput")[0];
const phoneNumber = document.getElementsByClassName("phoneInput")[0];
const registrateTicket = document.querySelector(".registration");
const privNums = document.getElementsByClassName("privateNum");
const firstnames = document.getElementsByClassName("nameInput");
const lastNames = document.getElementsByClassName("lastNameInput");  
const emails = document.getElementsByClassName("emailInput");
const phoneNumbers = document.getElementsByClassName("phoneInput");
const chosenSeatNumber = document.querySelectorAll('.passengers p span')

registrateTicket.addEventListener("click", function () {

  let isValid = true;
  const passengers = [];

  for (let i = 0; i < privNums.length; i++) {
    if (
      privNums[i].value.trim().length != 11 ||
      firstnames[i].value.trim() === "" ||
      lastNames[i].value.trim() === "" ||
      emails[0].value.trim() === "" ||
      !emails[0].value.trim().includes("@gmail.com") ||
      phoneNumbers[0].value.trim() === "" ||
      isNaN(phoneNumbers[0].value.trim().replace(/\s+/g, '')) ||
      privNums[i].value.trim() === privNums[i + 1]?.value.trim()
      // || chosenSeatNumber[i].innerHTML === "0"
      // I AM COMMENTING THIS TEMPORARLY BCZ I HAVENT WRITTEN SEAT CHOOSING LOGIC
    ) {
      isValid = false;
      break;
    } else {
      passengers.push({
        firstName: firstnames[i].value.trim(),
        lastName: lastNames[i].value.trim(),
        privateNumber: privNums[i].value.trim(),
      });
    }
  }

  if (!isValid) {
    errorDiv.style.display = "block";
    errorDiv.innerHTML = `
      <p>*მოხდა შეცდომა. ყველა ველი აუცილებლად უნდა შეივსოს</p>
    `;
  } else {
    errorDiv.style.display = "none";
    errorDiv.innerHTML = "";


    localStorage.setItem('passEmail', emails[0].value.trim())
    localStorage.setItem('passPhoneNum', phoneNumbers[0].value.trim())
    localStorage.setItem("passengersData", JSON.stringify(passengers));
  }
});
