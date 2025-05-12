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
        <p><span>ბილეთის ნომერი:</span> ${data.id}</p>
    
        <p><span>გაცემის თარიღი:</span> ${formattedDate}</p>
    </div>
    
    <div class="train-info">
        <div>
            <p>გასვლა:</p>
            <p>${data.train.departure}</p>
        </div>
        <div>
            <p>ჩასვლა:</p>
            <p>${data.train.arrive}</p>
        </div>
        <div>
            <p>გასვლის თარიღი:</p>
            <p>${georgianFullDate}</p>
        </div>
    </div>
    
    <div class="contact-info">
        <p>საკონტაქტო ინფორმაცია:</p>
        <div>
            <p><span>იმეილი:</span> ${data.email}</p>
            <p><span>ნომერი:</span> ${data.phone}</p>
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
        <p>${data.ticketPrice}₾</p>
      </div>
    </div>

    <div class="invoice-copyright">
      <p>ინვოისი იქმნება კომპიუტერის მიერ და ვალიდურია ბეჭედის და ხელმოწერის გარეშე</p>
      <p>გადმოწერეთ ბილეთი ან შეინახეთ ბილეთის ნომერი ადგილზე წარსადგენად.<p>
    </div>
    `;
      const passengersDiv = document.querySelector(".passengers-info");

      passengersDiv.innerHTML = "";
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
    })
    .catch((error) => {
      container.style.display = "none";
      errorDiv.style.display = "flex";
      errorDiv.innerHTML =
        "<p>ასეთი ბილეთი არ მოიძებნა, შეამოწმეთ ბილეთის ნომერი</p>";
      console.log(error);
    });
});


const printBtn = document.querySelector(".print");
const downloadBtn = document.querySelector(".download");

const ticketEl = document.querySelector(".ticket-info");

window.addEventListener("DOMContentLoaded", () => {
  const { jsPDF } = window.jspdf;

  let lastRenderedCanvas = null;

  function renderTicketAsCanvas() {
    return html2canvas(ticketEl, { scale: 2 }).then((canvas) => {
      lastRenderedCanvas = canvas;
      return canvas;
    });
  }

  downloadBtn.addEventListener("click", () => {
    renderTicketAsCanvas().then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);

      const imgDisplayWidth = imgWidth * ratio;
      const imgDisplayHeight = imgHeight * ratio;

      const x = (pageWidth - imgDisplayWidth) / 2;
      const y = (pageHeight - imgDisplayHeight) / 2;

      pdf.addImage(imgData, "PNG", x, y, imgDisplayWidth, imgDisplayHeight);
      pdf.save("ticket.pdf");
    });
  });

  printBtn.addEventListener("click", () => {
    const renderAndPrint = () => {
      const dataUrl = lastRenderedCanvas.toDataURL();
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Ticket</title>
            <style>
              body { margin: 0; display: flex; justify-content: center; align-items: center; height: 100vh; }
              img { max-width: 100%; max-height: 100%; }
            </style>
          </head>
          <body>
            <img src="${dataUrl}" onload="window.print(); window.onafterprint = () => window.close();" />
          </body>
        </html>
      `);
      printWindow.document.close();
    };

    if (lastRenderedCanvas) {
      renderAndPrint();
    } else {
      renderTicketAsCanvas().then(renderAndPrint);
    }
  });
});
