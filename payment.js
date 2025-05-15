const myForm = document.querySelector(".payment-info");
const cardOwner = document.getElementById("cardOwner");
const cardNum = document.getElementById("cardNum");
const cardCvv = document.getElementById("cardCvv");
const cardDate = document.getElementById("cardDate");
const newTicket = JSON.parse(sessionStorage.getItem("ticket"));
console.log(newTicket);

myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;

  const cardNumber = cardNum.value.trim().replace(/\s+/g, "");
  const cardCVV = cardCvv.value.trim().replace(/\s+/g, "");
  const cardOwnerName = cardOwner.value.trim();
  const cardDateValue = cardDate.value.trim();

  if (
    cardNumber === "" ||
    isNaN(Number(cardNumber)) ||
    cardCVV.length !== 3 ||
    isNaN(cardCVV) ||
    cardOwnerName === "" ||
    !dateRegex.test(cardDateValue)
  ) {
    alert("ყველა ველი აუცილებლად სწორად უნდა შეივსოს!");
  } else {
    sessionStorage.setItem("cardNum", cardNumber);
    sessionStorage.setItem("cardOwner", cardOwnerName);

    window.location.href = "paymentSucces.html";
  }
});

const total = document.getElementById("mustPay");
const totalFromInvoice = sessionStorage.getItem("total");

total.innerHTML = `${totalFromInvoice}.00₾`;
