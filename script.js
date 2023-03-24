"use strict"

const currencyE1 = document.getElementById('currency-one');
const currencyE2 = document.getElementById('currency-two');
const amountE1 = document.getElementById('amount-one');
const amountE2 = document.getElementById('amount-two');

const rateE1 = document.getElementById('rate');
const swap = document.getElementById('swap');

// fetch currency rates and update the dom
function calculate() {
    const currency_one =currencyE1.value
    const currency_two =currencyE2.value

    fetch(` https://v6.exchangerate-api.com/v6/a11ee2a7d4e6e8f8002b5dba/latest/${currency_one}`)
    .then((res) => res.json())
    .then((data) => {

        const rate = data.conversion_rates[currency_two];
        rateE1.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
        
        amountE2.value =(amountE1.value*rate).toFixed(2);
    })
}

currencyE1.addEventListener('change',calculate);
currencyE2.addEventListener('change',calculate);
amountE1.addEventListener('input',calculate);
amountE2.addEventListener('input',calculate);

swap.addEventListener('click', () => {
    const temp = currencyE1.value;
    currencyE1.value = currencyE2.value;
    currencyE2.value = temp;
    calculate();
});

calculate();