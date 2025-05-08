const fromInput = document.querySelector(".from"),
  fromList = document.querySelector(".from-ul"),
  fromListOption = document.querySelectorAll(".from-ul li"),
  toInput = document.querySelector(".to"),
  toList = document.querySelector(".to-ul"),
  toListOption = document.querySelectorAll(".to-ul li"),
  dateInput = document.querySelector(".date"),
  passengerCount = document.querySelector(".count"),
  searchTrainBtn = document.querySelector(".search-train"),
  listOption = document.querySelectorAll("form ul li"),
  header = document.getElementById("header"),
  myForm = document.getElementById("myForm");

fromInput.setAttribute("readonly", true);
toInput.setAttribute("readonly", true);

document.addEventListener("DOMContentLoaded", function () {
  flatpickr("#dateInput", {
    dateFormat: "Y-m-d",
    allowInput: false,
    clickOpens: true,
    minDate: "today",
  });
});

fromInput.addEventListener("click", () => {
  // სიას ხსნის
  fromInput.classList.add("active");
  document.querySelector(".input-from").classList.add("active");
});

window.addEventListener("click", function (event) {
  //სიას ხურავს
  if (event.target !== fromInput) {
    fromInput.classList.remove("active");
    document.querySelector(".input-from").classList.remove("active");
  }
});

fromListOption.forEach((option) => {
  // ველიუს უცვლის
  option.addEventListener("click", function () {
    fromInput.value = this.textContent;
    fromInput.classList.remove("active");
  });
});

toInput.addEventListener("click", () => {
  // სიას ხსნის
  toInput.classList.add("active");
  document.querySelector(".input-to").classList.add("active");
});

window.addEventListener("click", function (event) {
  // სიას ხურავს
  if (event.target !== toInput) {
    toInput.classList.remove("active");
    document.querySelector(".input-to").classList.remove("active");
  }
});

toListOption.forEach((option) => {
  // ველიუს უცვლის
  option.addEventListener("click", function () {
    toInput.value = this.textContent;
    toInput.classList.remove("active");
  });
});

myForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (
    fromInput.value.trim() === "საიდან" ||
    toInput.value.trim() === "სად" ||
    dateInput.value.trim() === "" ||
    passengerCount.value.trim() === "" ||
    fromInput.value.trim() === toInput.value.trim()
  ) {
    alert("ყველა ველი სწორად შეავსეთ!");
    return;
  } else {
    const selectedDate = dateInput.value;
    const weekDays = [
      "კვირა",
      "ორშაბათი",
      "სამშაბათი",
      "ოთხშაბათი",
      "ხუთშაბათი",
      "პარასკევი",
      "შაბათი",
    ];

    const date = new Date(selectedDate);
    const dayIndex = date.getDay();
    const weekDayName = weekDays[dayIndex];

    const georgianMonths = [
      "იანვარი",
      "თებერვალი",
      "მარტი",
      "აპრილი",
      "მაისი",
      "ივნისი",
      "ივლისი",
      "აგვისტო",
      "სექტემბერი",
      "ოქტომბერი",
      "ნოემბერი",
      "დეკემბერი",
    ];

    const day = date.getDate();
    const monthName = georgianMonths[date.getMonth()];
    const formattedGeorgianDate = `${weekDayName} ${day} ${monthName}`;
    localStorage.setItem("georgianFullDate", formattedGeorgianDate);
    localStorage.setItem("fromInputValue", fromInput.value.trim());
    localStorage.setItem("toInputValue", toInput.value.trim());
    localStorage.setItem("weekDayName", weekDayName);
    localStorage.setItem("passengerCount", passengerCount.value);

    window.location.href = "wantedTrains.html";
  }
});
