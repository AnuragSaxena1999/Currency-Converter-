const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const currFrom = document.querySelector(".from select")
const currTo = document.querySelector(".to select")
const msg = document.querySelector(".msg")


for(let select of dropdowns){
    for(let currCode in countryList){
       let newOption =  document.createElement("option");
       newOption.innerText = currCode;
       newOption.value = currCode;
       if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      }
      
    
       select.append(newOption);

    }
    select.addEventListener("change" , (evt) => {
            upadateFlag(evt.target);
    })
}
const upadateFlag = (element) => {
    let currcode = element.value;
    let countryCode = countryList[currcode];
    let newLink = `https://flagsapi.com/${countryCode}/flat/64.png`
    let img = element.parentElement.querySelector("img")
    img.src= newLink;
};

const updateExchange = async ()=>{
  
   let amount = document.querySelector("form input")
   let amtValue = amount.value;
   if(amtValue === "" || amtValue < 1){
    amtValue = 1;
    amount.value = "1";
   }
   const URL = `${BASE_URL}/${currFrom.value.toLowerCase()}/${currTo.value.toLowerCase()}.json`;
   let response = await fetch(URL);
   let data = await response.json();
   let rate = data[currTo.value.toLowerCase()];
   let finalAmount = amtValue * rate;
   msg.innerText = `${amtValue} ${currFrom.value} = ${finalAmount} ${currTo.value}`

};
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchange();
  });

  window.addEventListener("load", () => {
    updateExchange();
  });

