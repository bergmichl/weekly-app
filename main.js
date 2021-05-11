const containers = document.querySelectorAll('.container');
const toggleNavBtn = document.getElementById('toggle-nav');
const navEl = document.querySelector('nav');
const dateEl = document.querySelector('.date');
const labelEls = document.querySelectorAll('label[for=mood]');
const rangeInput = document.getElementById('mood');
const moreInfo = document.getElementById('moreInfo');
const infoEl = document.getElementById('info');
const addBtn = document.getElementById('add');
const btnsContainer = document.querySelector('.btns-container');

// Navigation
const li_today = document.getElementById('li-today');
li_today.addEventListener('click', function() {
  removeAllContainers();
  containers[0].classList.remove('d-none');
  toggleNav();
})
const li_week = document.getElementById('li-week');
li_week.addEventListener('click', function() {
  removeAllContainers();
  containers[1].classList.remove('d-none');
  toggleNav();
})

// Get Date and output it on the DOM
const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'];
let today = new Date();
let weekday = weekdays[today.getDay() - 1];
dateEl.innerText = `${weekday}, ${today.getDate()}.${+today.getMonth() + 1}.${today.getFullYear()}`;

// ----- EVENT-LISTENERS ------
toggleNavBtn.addEventListener('click', toggleNav);
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

function toggleNav() {
  navEl.classList.toggle('d-none');
}

function removeAllContainers() {
  containers.forEach((container) => {
    container.classList.add('d-none');
  });
}


// const inputs = document.querySelectorAll('input[type=text]'); ADD "Daumenemoji" after filled inputs 👍
// LOCAL STORAGE!
// Display LS on "week-page"
