const bookingDiv = document.getElementById("book-trains");
const index = localStorage.getItem("indexOfBtn");
let trainsArray = JSON.parse(localStorage.getItem("trainsArray"));
console.log(trainsArray);

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
              <input type="email" placeholder="იმეილი" required />
              <input type="text" placeholder="ტელეფონის ნომერი" required />
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
  
          <button>ბილეთების რეგისტრაცია</button>
        </div>

        `;


const errorDiv = document.querySelector('.error')     
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

                  <input type="text" placeholder="სახელი" class="nameInputs">
                  <input type="text" placeholder="გვარი" class="">
                  <input type="text" placeholder="პირადი ნომერი">

                  <button>ადგილის არჩევა</button>
                </div>
              </div>
              `;

  i++;
}

