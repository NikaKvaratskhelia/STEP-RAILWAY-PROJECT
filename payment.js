const myForm = document.querySelector(".payment-info");
const cardOwner = document.getElementById("cardOwner");
const cardNum = document.getElementById("cardNum");
const cardCvv = document.getElementById("cardCvv");
const cardDate = document.getElementById("cardDate");
const newTicket = JSON.parse(localStorage.getItem("ticket"));
console.log(newTicket);

myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    isNaN(Number(cardNum.value.trim().replace(/\s+/g, ""))) ||
    cardCvv.value.trim().replace(/\s+/g, "").length != 3 ||
    cardOwner.value.trim() === "" ||
    cardNum.value.trim() === "" ||
    cardDate.value.trim().length != 7
  ) {
    alert("ყველა ველი აუცილებლად სწორად უნდა შეივსოს!");
  } else {
    localStorage.setItem("cardNum", cardNum.value.trim());
    localStorage.setItem("cardOwner", cardOwner.value.trim());

    window.location.href = "paymentSucces.html";
  }
});

const total = document.getElementById("mustPay");
const totalFromInvoice = localStorage.getItem("total");

total.innerHTML = `${totalFromInvoice}.00₾`;
