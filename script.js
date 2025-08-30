const startStopBtn = document.getElementById('startStopBtn');
const scrollUpBtn = document.getElementById('scrollUpBtn');
const scrollDownBtn = document.getElementById('scrollDownBtn');
const pushBtn = document.getElementById('pushBtn');
const speedInput = document.getElementById('speed');
const fontSizeInput = document.getElementById('fontSize');
const textInput = document.getElementById('textInput');
const teleprompter = document.getElementById('teleprompter');
const textDisplay = document.getElementById('textDisplay');

let isScrolling = false;
let scrollInterval;

pushBtn.addEventListener('click', () => {
    const textWithBreaks = textInput.value.replace(/\r\n?|\n/g, '<br>');
    textDisplay.innerHTML = textWithBreaks;
});

fontSizeInput.addEventListener('input', () => {
    teleprompter.style.fontSize = `${fontSizeInput.value}px`;
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
        const speed = parseInt(speedInput.value, 10);
        teleprompter.scrollTop += speed;
    }, 100);
}

function stopScrolling() {
    isScrolling = false;
    startStopBtn.innerText = 'Start';
    clearInterval(scrollInterval);
}

let scrollUpInterval;
let scrollDownInterval;

scrollUpBtn.addEventListener('mousedown', () => {
    scrollUpInterval = setInterval(() => {
        teleprompter.scrollTop -= 5;
    }, 20);
});

scrollUpBtn.addEventListener('mouseup', () => {
    clearInterval(scrollUpInterval);
});

scrollUpBtn.addEventListener('mouseleave', () => {
    clearInterval(scrollUpInterval);
});

scrollDownBtn.addEventListener('mousedown', () => {
    scrollDownInterval = setInterval(() => {
        teleprompter.scrollTop += 5;
    }, 20);
});

scrollDownBtn.addEventListener('mouseup', () => {
    clearInterval(scrollDownInterval);
});

scrollDownBtn.addEventListener('mouseleave', () => {
    clearInterval(scrollDownInterval);
});
