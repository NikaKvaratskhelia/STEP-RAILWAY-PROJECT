const trainDiv = document.getElementById("trainTable");

fetch("https://railway.stepprojects.ge/api/departures")
  .then((response) => response.json())
  .then((data) => {
    let allTrainList = [];
    let wantedTrains = [];

    allTrainList = data;
    allTrainList.forEach((item) => {
      if (
        item.source === sessionStorage.getItem("fromInputValue") &&
        item.destination === sessionStorage.getItem("toInputValue") &&
        item.date === sessionStorage.getItem("weekDayName")
      ) {
        for (let i = 0; i < item.trains.length; i++) {
          wantedTrains.push(item.trains[i]);
        }
      }
    });

    let tr = "";

    if (wantedTrains.length > 0) {
      wantedTrains.forEach(
        (i) =>
          (tr += `
                <tr>
                  <td>
                    <p>#${i.number}</p>
                    <p data-translate="${i.name}">${i.name} Express</p>
                  </td>
                  <td>
                    <p>${i.departure}</p>
                    <p data-translate="${i.from}">${i.from}</p>
                  </td>
                  <td>
                    <p>${i.arrive}</p>
                    <p data-translate="${i.to}">
                    ${i.to}
                    </p>
                  </td>
                  <td>
                    <button class="btn" data-translate='დაჯავშნა'>
                    დაჯავშნა
                    </button>
                  </td>
                </tr>
              `)
      );
    } else {
      tr += `<div class='error-div'><h2>სასურველი მატარებელი ვერ მოიძებნა </h2>
          <a href='Homepage.html'>დაბრუნდი უკან</a>
          </div>`;
    }

    trainDiv.innerHTML = tr;

    const btns = document.querySelectorAll(".btn");
    console.log(btns);

    btns.forEach((btn, index) =>
      btn.addEventListener("click", function () {
        window.location.href = "booking.html";

        sessionStorage.setItem("indexOfBtn", index);
        sessionStorage.setItem("trainsArray", JSON.stringify(wantedTrains));
      })
    );
  });
