const containers = document.querySelectorAll('.container');
const containerToday = document.querySelector('.container-today');
const containerWeek = document.querySelector('.container-week');
const toggleNavBtn = document.getElementById('toggle-nav');
const navEl = document.querySelector('nav');
const dateEl = document.querySelector('.date');
const labelEls = document.querySelectorAll('label[for=mood]');
const rangeInput = document.getElementById('mood');
const moreInfo = document.getElementById('moreInfo');
const infoEl = document.getElementById('info');
const inputs = document.querySelectorAll('input[type=text]');
const btnsContainer = document.querySelector('.btns-container');
const submitBtn = document.getElementById('submit');
const addBtn = document.getElementById('add');
const week = document.querySelector('.week');

const moodColors = [
  'red', 'orangered', 'orange', 'limegreen', 'lawngreen'
];

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
submitBtn.addEventListener('click', submitTodayLS);

// ----- FUNCTIONS -----
checkStatus();

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

function submitTodayLS() {
  let entry = [];
  entry.push({
    date: dateEl.innerText,
    mood: +rangeInput.value,
    checks: getCheckedFields()
  })

  localStorage.setItem('weekly', JSON.stringify(entry));
  checkStatus();
  window.location.reload();
}

function getCheckedFields() {
  let checkedFieldsArr = [];

  inputs.forEach((input) => {
    if(input.value){
      checkedFieldsArr.push(input.value);
    }
  });

  return checkedFieldsArr;
}

// Check if daily entry has been made
function checkStatus() {
  let lastEntry = JSON.parse(localStorage.getItem('weekly'));
  if(lastEntry === null) {
    return;
  } else {
    let lastEntryDate = lastEntry[0].date;

    if(dateEl.innerText == lastEntryDate) {
      let messageNode = document.createElement('h1');
      messageNode.innerHTML = 'Super - du hast den heutigen Eintrag bereits erledigt!';
      containerToday.innerHTML = '';
      containerToday.appendChild(messageNode);
    } else return;
  }
  
}

// output LS data to WEEK-page
let weeklyDB = JSON.parse(localStorage.getItem('weekly'));
if(weeklyDB != null) {
  if(weeklyDB.length > 8) {
    const btns = document.querySelector('.container-week .btns-container');
    btns.classList.remove('d-none');
  }

  weeklyDB.forEach((day) => {
    let div = document.createElement('div');
    div.classList.add('day');
    div.style.backgroundColor = moodColors[day.mood - 1];

    let h3 = document.createElement('h3');
    h3.innerText = day.date;
    let ul = document.createElement('ul');
    day.checks.forEach((check) => {
      let li = document.createElement('li');
      li.innerText = check;
      ul.appendChild(li);
    })

    week.appendChild(div);
    div.appendChild(h3);
    div.appendChild(ul);
  })

} else {
    let messageNode = document.createElement('div');
    messageNode.innerHTML = '<h1 class="message">Es sind noch keine Einträge vorhanden!</h1><p>Die App speichert nur Daten im jeweiligen Browser, wo sie aufgerufen wird und nur am jeweiligen Gerät.</p>';
    containerWeek.appendChild(messageNode);
}