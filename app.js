const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

// Example countryList. Replace with your actual list.

  // Add more currencies as needed


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Helper to update flag (implement as needed)

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;

    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
 const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Fetch and update exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const base = fromCurr.value.toLowerCase();
  const target = toCurr.value.toLowerCase();
  const URL = `${BASE_URL}/${base}.json`;

  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json();
    const rate = data[base][target];
    if (!rate) throw new Error(`No rate found for ${target}`);

    const finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = `Error: ${error.message}`;
  }
};

// Event listener for button
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

// Optionally, update rate on dropdown change
fromCurr.addEventListener("change", updateExchangeRate);
toCurr.addEventListener("change", updateExchangeRate);

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};