const trainDiv = document.getElementById("trainTable");

fetch("https://railway.stepprojects.ge/api/departures")
  .then((response) => response.json())
  .then((data) => {
    let allTrainList = [];
    let wantedTrains = [];

    allTrainList = data;
    allTrainList.forEach((item) => {
      if (
        item.source === localStorage.getItem("fromInputValue") &&
        item.destination === localStorage.getItem("toInputValue") &&
        item.date === localStorage.getItem("weekDayName")
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
                    <p>${i.name} Express</p>
                  </td>
                  <td>
                    <p>${i.departure}</p>
                    <p>${i.from}</p>
                  </td>
                  <td>
                    <p>${i.arrive}</p>
                    <p>
                    ${i.to}
                    </p>
                  </td>
                  <td>
                    <button class="btn">
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

        localStorage.setItem('indexOfBtn', index)
        localStorage.setItem('trainsArray', JSON.stringify(wantedTrains))
      })
    );
  });
