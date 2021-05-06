const dateEl = document.querySelector('.date');
const moreInfo = document.getElementById('moreInfo');
const infoEl = document.getElementById('info');
const addBtn = document.getElementById('add');
const btnsContainer = document.querySelector('.btns-container');
// const inputs = document.querySelectorAll('input[type=text]'); ADD "Daumenemoji" after filled inputs 👍

// Get Date and output it on the DOM
const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
let today = new Date();
let weekday = weekdays[today.getDay() - 1];
dateEl.innerText = `${weekday}, ${today.getDate()}.${+today.getMonth() + 1}.${today.getFullYear()}`;

// ----- EVENTS ------
moreInfo.addEventListener('click', () => infoEl.classList.toggle('hidden'));
addBtn.addEventListener('click', addInputToDOM);

// ----- FUNCTIONS -----
function addInputToDOM() {
  let newInputEl = document.createElement('input');
  newInputEl.setAttribute('type', 'text');
  btnsContainer.parentNode.insertBefore(newInputEl, btnsContainer)
  newInputEl.focus()
}