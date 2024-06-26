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
let inputs = document.querySelectorAll('input[type=text]');
const btnsContainer = document.querySelector('.btns-container');
const submitBtn = document.getElementById('submit');
const addBtn = document.getElementById('add');
const week = document.querySelector('.week');
const form = document.getElementById('main-form');

const moodColors = [
  'red', 'orangered', 'orange', 'green', 'limegreen'
];

const moods = [
  'Sehr schlecht', 'Schlecht', 'Mittelmäßig', 'Gut', 'Sehr gut'
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
const weekdays = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
let today = new Date();
let weekday = weekdays[today.getDay()]; // getDay() returns => 0 = Sonntag, 1 = Montag ..., 6 = Samstag
dateEl.innerText = `${weekday}, ${today.getDate()}.${+today.getMonth() + 1}.${today.getFullYear()}`;

// ----- EVENT-LISTENERS ------
toggleNavBtn.addEventListener('click', toggleNav);
rangeInput.addEventListener('input', updateEmoji);
moreInfo.addEventListener('click', () => infoEl.classList.toggle('d-none'));
addBtn.addEventListener('click', addInputToDOM);
submitBtn.addEventListener('click', submitTodayLS);
inputs.forEach((input) => input.addEventListener('blur', () => showThumb(input)));
form.addEventListener('submit', e => e.preventDefault());


// ----- FUNCTIONS -----
checkStatus();

function showThumb(input) {
  if(input.value != '') {
    let span = input.nextElementSibling;
    span.classList.remove('d-none');

    setTimeout(() => span.classList.add('go-away'), 1000);
    setTimeout(() => {
      span.classList.add('d-none');
      span.classList.remove('go-away');
    }, 2500);
  }
}

function addInputToDOM() {
  const div = document.createElement('div');
  div.classList.add('input-wrapper');

  const input = document.createElement('input');
  input.setAttribute('type', 'text');

  const span = document.createElement('span');
  span.classList.add('thumb', 'd-none');
  span.innerText = '👍';

  div.appendChild(input);
  div.appendChild(span);

  btnsContainer.parentNode.insertBefore(div, btnsContainer)
  input.focus();
  input.addEventListener('blur', () => showThumb(input));
}

function updateEmoji() {
  labelEls.forEach(label => label.classList.add('v-hidden'));
  labelEls[rangeInput.value - 1].classList.remove('v-hidden');
  // change color of shadow
  if(rangeInput.value == 1) {
    rangeInput.style.boxShadow = `0 0 10px ${moodColors[0]}`;
  } else if (rangeInput.value == 2) {
    rangeInput.style.boxShadow = `0 0 10px ${moodColors[1]}`;
  } else if (rangeInput.value == 3) {
    rangeInput.style.boxShadow = `0 0 10px ${moodColors[2]}`;
  } else if (rangeInput.value == 4) {
    rangeInput.style.boxShadow = `0 0 10px ${moodColors[3]}`;
  } else if (rangeInput.value == 5) {
    rangeInput.style.boxShadow = `0 0 10px ${moodColors[4]}`;
  }
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
  let invalid = false;
  let invalidInputs = [];

  inputs.forEach(input => {
    if(input.value == '') {
      invalid = true;
      invalidInputs.push(input);
    }
  })
  
  if(invalid) {
    return showInvalid(invalidInputs);
  } else {
    let entry = [];

    let lastEntries = JSON.parse(localStorage.getItem('weekly'));
    if(lastEntries) {
      lastEntries.forEach(pastEntry => entry.push(pastEntry));
    }

    entry.push({
      date: dateEl.innerText,
      mood: +rangeInput.value,
      checks: getCheckedFields()
    })

    localStorage.setItem('weekly', JSON.stringify(entry));
    checkStatus();
    window.location.reload();
  }
}

function showInvalid(invalidInputsArr) {
  infoEl.classList.remove('d-none');

  invalidInputsArr.forEach(input => {
    input.placeholder = 'Du hast heute bestimmt 3 Dinge gut gemacht!';
  })
}

function getCheckedFields() {
  let checkedFieldsArr = [];

  let inputs = document.querySelectorAll('input[type=text]');
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
    let lastEntryDate = lastEntry[lastEntry.length - 1].date;

    if(dateEl.innerText == lastEntryDate) {
      let messageNode = document.createElement('h2');
      messageNode.classList.add('done-text')
      messageNode.innerHTML = 'Super - du hast den heutigen Eintrag bereits erledigt!';
      let img = document.createElement('img');
      img.src = "/img/icon.svg";
      img.classList.add("done-icon");
      containerToday.innerHTML = '';
      containerToday.appendChild(messageNode);
      containerToday.appendChild(img);
    } else return;
  }
}

// output LS data to WEEK-page
let weeklyDB = JSON.parse(localStorage.getItem('weekly'));

if(weeklyDB) {
  weeklyDB.reverse();
  const statistic = document.querySelector('.statistic');
  statistic.classList.remove('d-none');

  let avNumber = 0;
  let avText;
  let avColor;
  weeklyDB.forEach(day => {
    avNumber += day.mood;
  })
  avNumber = +avNumber / +weeklyDB.length;

  if(avNumber <= 1.5 ){
    avText = moods[0];
    avColor = moodColors[0];
  } else if (avNumber > 1.5 && avNumber <= 2.5){
    avText = moods[1];
    avColor = moodColors[1];
  } else if (avNumber > 2.5 && avNumber <= 3.5){
    avText = moods[2];
    avColor = moodColors[2];
  } else if (avNumber > 3.5 && avNumber <= 4.5){
    avText = moods[3];
    avColor = moodColors[3];
  } else if (avNumber > 4.5){
    avText = moods[4];
    avColor = moodColors[4];
  }
  const nrSpan = document.getElementById('average-mood');
  nrSpan.innerText = avText;
  nrSpan.style.color = avColor;

  weeklyDB.forEach((day) => {
    let div = document.createElement('div');
    div.classList.add('day');
    div.style.backgroundColor = moodColors[day.mood - 1];
    div.style.overflowX = 'auto';
    div.style.color = 'black';

    let h3 = document.createElement('h3');
    h3.innerText = day.date;

    let p = document.createElement('p');
    p.innerText = moods[day.mood - 1];
    p.style.textAlign = 'right';
    p.style.fontSize = '.75rem';
    p.style.position = 'relative';
    p.style.top = '-1.2rem';

    let ul = document.createElement('ul');
    day.checks.forEach((check) => {
      let li = document.createElement('li');
      li.innerText = check;
      ul.appendChild(li);
    });

    week.appendChild(div);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(ul);
  });
} else {
  let messageNode = document.createElement('div');
  messageNode.style.textAlign = 'center';
  messageNode.innerHTML = '<h1 class="message">Es sind noch keine Einträge vorhanden!</h1><p>Die App speichert nur Daten im jeweiligen Browser, wo sie aufgerufen wird und nur am jeweiligen Gerät.</p>';
  containerWeek.appendChild(messageNode);
}