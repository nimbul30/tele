const startStopBtn = document.getElementById('startStopBtn');
const toggleInputBtn = document.getElementById('toggleInputBtn');

const speedUpBtn = document.getElementById('speedUpBtn');
const speedDownBtn = document.getElementById('speedDownBtn');
const fontSizeUpBtn = document.getElementById('fontSizeUpBtn');
const fontSizeDownBtn = document.getElementById('fontSizeDownBtn');

const speedValue = document.getElementById('speedValue');
const fontSizeValue = document.getElementById('fontSizeValue');

const textInput = document.getElementById('textInput');
const teleprompter = document.getElementById('teleprompter');
const textDisplay = document.getElementById('textDisplay');

let isScrolling = false;
let scrollInterval;
let scrollSpeed = 5;
let fontSize = 48;

textInput.addEventListener('input', () => {
  const textWithBreaks = textInput.value.replace(/\r\n?|\n/g, '<br>');
  textDisplay.innerHTML = textWithBreaks;
});

speedUpBtn.addEventListener('click', () => {
  scrollSpeed++;
  speedValue.textContent = scrollSpeed;
});

speedDownBtn.addEventListener('click', () => {
  if (scrollSpeed > 1) {
    scrollSpeed--;
    speedValue.textContent = scrollSpeed;
  }
});

fontSizeUpBtn.addEventListener('click', () => {
  fontSize++;
  teleprompter.style.fontSize = `${fontSize}px`;
  fontSizeValue.textContent = fontSize;
});

fontSizeDownBtn.addEventListener('click', () => {
  if (fontSize > 12) {
    fontSize--;
    teleprompter.style.fontSize = `${fontSize}px`;
    fontSizeValue.textContent = fontSize;
  }
});

startStopBtn.addEventListener('click', () => {
  if (isScrolling) {
    stopScrolling();
  } else {
    startScrolling();
  }
});

function startScrolling() {
  isScrolling = true;
  startStopBtn.innerText = 'Stop';
  scrollInterval = setInterval(() => {
    teleprompter.scrollTop += scrollSpeed / 10;
  }, 100);
}

function stopScrolling() {
  isScrolling = false;
  startStopBtn.innerText = 'Start';
  clearInterval(scrollInterval);
}

toggleInputBtn.addEventListener('click', () => {
  textInput.classList.toggle('hidden');
  if (textInput.classList.contains('hidden')) {
    toggleInputBtn.innerText = 'Show Input';
  } else {
    toggleInputBtn.innerText = 'Hide Input';
  }
});
