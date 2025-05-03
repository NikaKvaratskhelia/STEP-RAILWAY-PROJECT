const myForm = document.querySelector(".payment-info");
const cardOwner = document.getElementById("cardOwner");
const cardNum = document.getElementById("cardNum");
const cardCvv = document.getElementById("cardCvv");
const cardDate = document.getElementById("cardDate");

myForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (
    isNaN(Number(cardNum.value.trim().replace(/\s+/g, ""))) ||
    cardCvv.value.trim().replace(/\s+/g, "").length != 3 ||
    cardOwner.value.trim() === "" ||
    cardDate.value.trim().length != 7
  ) {
    alert("ყველა ველი აუცილებლად სწორად უნდა შეივსოს!");
  } else {
    localStorage.setItem("carNum", cardNum.value.trim());
    localStorage.setItem("cardOwner", cardOwner.value.trim());
    window.location.href = "paymentSucces.html";
  }
});

const total = document.getElementById('mustPay')
const totalFromInvoice = localStorage.getItem('totalFromInvoice')

total.innerHTML = `${totalFromInvoice}.00₾`

const icons = document.querySelectorAll(".icons a");

icons.forEach((icon) =>
  icon.addEventListener("click", function () {
    window.location.href = "Homepage.html";
    localStorage.clear();
  })
);
