const bookingDiv = document.getElementById("table-details-checkout");
const index = sessionStorage.getItem("indexOfBtn");
let trainsArray = JSON.parse(sessionStorage.getItem("trainsArray"));
const theTrain = trainsArray[index];
sessionStorage.setItem("theTrain", JSON.stringify(theTrain));

bookingDiv.innerHTML = "";

bookingDiv.innerHTML = `
<div>
  <div>
    <p>#${theTrain.number}</p>
    <p data-translate="${theTrain.name}">${theTrain.name} Express</p>
  </div>
</div>
<div>
  <div>
    <p>${theTrain.departure}</p>
    <p data-translate="${theTrain.from}">${theTrain.from}</p>
  </div>
</div>
<div>
  <div>
    <p>${theTrain.arrive}</p>
    <p data-translate="${theTrain.to}">${theTrain.to}</p>
  </div>
</div>`;

const errorDiv = document.querySelector(".error");
const passengersInfo = document.querySelector(".passengers-info-div");
let count = Number(sessionStorage.getItem("passengerCount"));

passengersInfo.innerHTML = "";
let i = 1;
while (i <= count) {
  passengersInfo.innerHTML += `
                  <div>
                <h4> <span data-translate="მგზავრი">მგზავრი</span> ${i}</h4>
                <div class="passengers">
                  <p><span data-translate="ადგილი:">ადგილი:</span> <span class="number">0</span></p>

                  <input type="text" placeholder="სახელი" 
                  data-translate-placeholder="სახელი" class="nameInput">
                  <input type="text" placeholder="გვარი" 
                  data-translate-placeholder="გვარი"
                  class="lastNameInput">
                  <input type="text" placeholder="პირადი ნომერი"
                  data-translate-placeholder="პირადი ნომერი"
                  class="privateNum">

                  <button class="chooseSeat" data-translate="ადგილის არჩევა">ადგილის არჩევა</button>
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
const chosenSeatNumber = document.querySelectorAll(".number");
const chooseSeatBtns = document.querySelectorAll(".chooseSeat");
const seatBookingDiv = document.querySelector(".book-seats-wrapper");
const closeSeatbookingDivBtn = document.querySelector(".book-seats>p");
const seatsDv = document.getElementById("seats-div");
const vagonNumP = document.getElementById("vagonNum");
const vagons = JSON.parse(sessionStorage.getItem("vagons"));
const vagonImgs = document.querySelectorAll(".vagonImg");

closeSeatbookingDivBtn.addEventListener("click", function () {
  seatBookingDiv.classList.remove("active");
  vagonImgs[0].classList.remove("active");
  vagonImgs[1].classList.remove("active");
  vagonImgs[2].classList.remove("active");
  seatsDv.classList.remove("active");
  vagonNumP.innerHTML = "გთხოვთ აირჩიოთ ვაგონი";
  vagonNumP.setAttribute("data-translate", "გთხოვთ აირჩიოთ ვაგონი")
});

fetch(`https://railway.stepprojects.ge/api/trains/${theTrain.id}`)
  .then((res) => res.json())
  .then((data) => {
    const vagons = data.vagons;
    sessionStorage.setItem("vagons", JSON.stringify(vagons));
  });

chooseSeatBtns.forEach((btn, index) => {
  btn.addEventListener("click", function () {
    sessionStorage.setItem("indexOpenSeatingBtn", index);
    seatBookingDiv.classList.add("active");
  });
});

vagonImgs[0].addEventListener("click", function () {
  vagonImgs[1].classList.remove("active");
  vagonImgs[2].classList.remove("active");
});

vagonImgs[1].addEventListener("click", function () {
  vagonImgs[0].classList.remove("active");
  vagonImgs[2].classList.remove("active");
});

vagonImgs[2].addEventListener("click", function () {
  vagonImgs[1].classList.remove("active");
  vagonImgs[0].classList.remove("active");
});

vagonImgs.forEach((img, index) =>
  img.addEventListener("click", function () {
    img.classList.add("active");

    currentVagon = vagons[index];
    currentVagonId = currentVagon.id;

    const seatsDiv = document.querySelectorAll(".seats>div");
    seatsDiv.forEach((seat) => (seat.innerHTML = ""));

    seatsDv.classList.add("active");

    vagonNumP.innerHTML = `ვაგონის ნომერი: ${index + 1}`;
    vagonNumP.setAttribute("data-translate", `ვაგონის ნომერი: ${index + 1}`)

    fetch(`https://railway.stepprojects.ge/api/getvagon/${currentVagonId}`)
      .then((res) => res.json())
      .then((data) => {
        const mainVagon = data;
        seatsDiv.forEach((seat) => (seat.innerHTML = ""));

        mainVagon[0].seats.sort((a, b) => {
          const aChar = a.number.replace(/[0-9]/g, "");
          const bChar = b.number.replace(/[0-9]/g, "");
          const aNum = parseInt(a.number);
          const bNum = parseInt(b.number);

          if (aChar < bChar) return -1;
          if (aChar > bChar) return 1;

          return aNum - bNum;
        });

        for (let i = 0; i < 10; i++) {
          seatsDiv[0].innerHTML += `<div class="chairBtns"><p>${mainVagon[0].seats[i].number}</p></div>`;
        }
        for (let i = 10; i < 20; i++) {
          seatsDiv[1].innerHTML += `<div class="chairBtns"><p>${mainVagon[0].seats[i].number}</p></div>`;
        }
        for (let i = 20; i < 30; i++) {
          seatsDiv[2].innerHTML += `<div class="chairBtns"><p>${mainVagon[0].seats[i].number}</p></div>`;
        }
        for (let i = 30; i < 40; i++) {
          seatsDiv[3].innerHTML += `<div class="chairBtns"><p>${mainVagon[0].seats[i].number}</p></div>`;
        }

        const chairBtns = document.querySelectorAll(".chairBtns");
        const selectedSeatIds = Array.from(chosenSeatNumber)
          .map((element) => element.getAttribute("seat-id"))
          .filter((id) => id);

        chairBtns.forEach((btn, index) => {
          const seat = mainVagon[0].seats[index];
          const seatId = seat.seatId;
          const indexOpenSeatingBtn = sessionStorage.getItem(
            "indexOpenSeatingBtn"
          );

          if (seat.isOccupied) {
            btn.classList.add("occupied");
            return;
          }

          btn.setAttribute("seat-id", seatId);

          if (selectedSeatIds.includes(seatId)) {
            btn.style.backgroundColor = "#f23b4b";
          }

          btn.addEventListener("click", function () {
            if (selectedSeatIds.includes(seatId)) return;
            console.log(selectedSeatIds);

            selectedSeatIds.splice(indexOpenSeatingBtn, 1);

            chosenSeatNumber[indexOpenSeatingBtn].innerHTML = seat.number;
            chosenSeatNumber[indexOpenSeatingBtn].setAttribute(
              "seat-id",
              seatId
            );

            const invoiceBody = document.querySelector(".invoice-table-body");
            const oldRow = invoiceBody.querySelector(
              `tr[data-passenger="${indexOpenSeatingBtn}"]`
            );
            if (oldRow) oldRow.remove();

            const newRow = document.createElement("tr");
            newRow.classList.add("tbodyTr");
            newRow.setAttribute("data-id", seatId);
            newRow.setAttribute("data-passenger", indexOpenSeatingBtn);
            newRow.innerHTML = `
              <td class="seatNumber">${seat.number}</td>
              <td class="seatPrice">${seat.price}₾</td>
            `;

            const allRows = invoiceBody.querySelectorAll("tr");
            if (allRows.length <= indexOpenSeatingBtn) {
              invoiceBody.appendChild(newRow);
            } else {
              invoiceBody.insertBefore(newRow, allRows[indexOpenSeatingBtn]);
            }

            const chosenSeatPrices = document.querySelectorAll(".seatPrice");
            const totalPrice = document.getElementById("total");
            let total = 0;
            chosenSeatPrices.forEach((td) => {
              total += parseInt(td.textContent);
            });
            totalPrice.innerHTML = total;
            sessionStorage.setItem("total", totalPrice.textContent);

            chairBtns.forEach((btn, index) => {
              const seatId = mainVagon[0].seats[index].seatId;
              if (
                chosenSeatNumber[indexOpenSeatingBtn].getAttribute(
                  "seat-id"
                ) === seatId
              ) {
                btn.style.backgroundColor = "#f23b4b";
                btn.classList.add("checked");
              } else if (!selectedSeatIds.includes(seatId)) {
                btn.style.backgroundColor = "#bad955";
                btn.classList.remove("checked");
              }
            });
          });
        });
      });
  })
);

registrateTicket.addEventListener("click", function () {
  let isValid = true;

  for (let i = 0; i < privNums.length; i++) {
    if (
      privNums[i].value.trim().length != 11 ||
      firstnames[i].value.trim() === "" ||
      lastNames[i].value.trim() === "" ||
      privNums[i].value.trim() === privNums[i + 1]?.value.trim() ||
      emails[0].value.trim() === "" ||
      !emails[0].value.trim().includes("@gmail.com") ||
      phoneNumbers[0].value.trim().replace(/\s+/g, "").length != 9 ||
      isNaN(phoneNumbers[0].value.trim().replace(/\s+/g, "")) ||
      chosenSeatNumber[i].innerHTML === "0"
    ) {
      isValid = false;
      break;
    }
  }

  if (!isValid) {
    errorDiv.style.display = "block";
    errorDiv.innerHTML = `
      <p data-translate="*მოხდა შეცდომა. ყველა ველი აუცილებლად უნდა შეივსოს">*მოხდა შეცდომა. ყველა ველი აუცილებლად უნდა შეივსოს</p>
    `;
  } else {
    errorDiv.style.display = "none";
    errorDiv.innerHTML = "";

    sessionStorage.setItem("passEmail", emails[0].value.trim());
    sessionStorage.setItem("passPhoneNum", phoneNumbers[0].value.trim());

    registrateTicketFunction();

    setTimeout(() => {
      window.location.href = "payment.html";
    }, 2000);
  }
});

async function registrateTicketFunction() {
  const count = sessionStorage.getItem("passengerCount");

  const newTicket = {
    trainId: theTrain.id,
    date: new Date(),
    email: emails[0].value,
    phoneNumber: phoneNumbers[0].value,
    people: [],
  };
  const seatFetches = [];

  for (let i = 0; i < count; i++) {
    const seatId = chosenSeatNumber[i].getAttribute("seat-id");
    seatFetches.push(
      fetch(`https://railway.stepprojects.ge/api/seat/${seatId}`).then((res) =>
        res.json()
      )
    );
  }

  const allSeatData = await Promise.all(seatFetches);

  for (let i = 0; i < count; i++) {
    const seat = allSeatData[i];

    const person = {
      seatId: seat.seatId,
      name: firstnames[i].value.trim(),
      surname: lastNames[i].value.trim(),
      idNumber: privNums[i].value.trim(),
      status: "0",
      payoutCompleted: true,
    };

    newTicket.people.push(person);

    fetch("https://railway.stepprojects.ge/api/tickets/register", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(newTicket),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        sessionStorage.setItem("ticket-id", data);
      });
  }

  console.log(newTicket);
  sessionStorage.setItem("ticket", JSON.stringify(newTicket));
}
