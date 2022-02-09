//api from fixer.io
const url = 'https://api.exchangerate.host/';
const symbols = '?base=CHF&symbols=EUR,USD,JPY,GBP';

// capture the date
let bouton = document.getElementById('reload');
//let input = document.getElementById('date-string');
let arrayDate = [];

const loadDate = () => {
  const inputDate = document.querySelector('#date-string');
  // add 5 new dates
  const firstDate = new Date(inputDate.value);
  arrayDate.push(inputDate.value);
  const newDate = new Date(firstDate);
  for (let index = 0; index < 4; index++) {
    newDate.setDate(newDate.getDate() + 1);
    arrayDate.push(newDate.toLocaleDateString().split('/').reverse().join('-'));
  }
  exchange();
};

const exchange = async () => {
  await Promise.all(
    arrayDate.map(async dates => {
      const response = await fetch(url + dates + symbols);
      let data = await response.json();
      show(data);
    })
  );
};

// show the data
let show = data => {
  const events = new Date(data.date);
  let euroDate = events.toLocaleDateString();
  let tab = `
      <tr>
      <td>${euroDate} </td>
      <td>${data.rates.EUR}</td>
      <td>${data.rates.USD}</td>
      <td>${data.rates.JPY}</td>
      <td>${data.rates.GBP}</td>
      </tr>
      `;

  let p = document.createElement('p');
  p.textContent = `EURO:${data.rates.EUR} - USD${data.rates.EUR} - JPY:${data.rates.JPY} - GBP:${data.rates.GBP}`;

  // ADD in HTML
  if (data.date == arrayDate[0]) {
    document.getElementById('info').appendChild(p);
  }
  document.getElementById('list-rate').innerHTML += tab;
};

const refresh = () => {
  arrayDate = [];
  document.getElementById('list-rate').innerHTML = '';
  document.getElementById('info').innerHTML = '';
};

window.addEventListener('load', loadDate);
bouton.addEventListener(
  'click',
  e => {
    e.preventDefault;
    refresh();
    setTimeout(() => {
      loadDate();
    }, 500);
  },
  false
);
