const dateEl = document.querySelector('.date');
const labelEls = document.querySelectorAll('label[for=mood]');
const rangeInput = document.getElementById('mood');
const moreInfo = document.getElementById('moreInfo');
const infoEl = document.getElementById('info');
const addBtn = document.getElementById('add');
const btnsContainer = document.querySelector('.btns-container');

// Get Date and output it on the DOM
const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
let today = new Date();
let weekday = weekdays[today.getDay() - 1];
dateEl.innerText = `${weekday}, ${today.getDate()}.${+today.getMonth() + 1}.${today.getFullYear()}`;

// ----- EVENT-LISTENERS ------
rangeInput.addEventListener('input', updateEmoji);
moreInfo.addEventListener('click', () => infoEl.classList.toggle('d-none'));
addBtn.addEventListener('click', addInputToDOM);

// ----- FUNCTIONS -----
function addInputToDOM() {
  let newInputEl = document.createElement('input');
  newInputEl.setAttribute('type', 'text');
  btnsContainer.parentNode.insertBefore(newInputEl, btnsContainer)
  newInputEl.focus()
}

function updateEmoji() {
  labelEls.forEach(label => label.classList.add('v-hidden'));
  labelEls[rangeInput.value - 1].classList.remove('v-hidden');
}



// const inputs = document.querySelectorAll('input[type=text]'); ADD "Daumenemoji" after filled inputs 👍
