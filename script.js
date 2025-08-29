const startStopBtn = document.getElementById('startStopBtn');
const speedInput = document.getElementById('speed');
const fontSizeInput = document.getElementById('fontSize');
const textInput = document.getElementById('textInput');
const teleprompter = document.getElementById('teleprompter');
const textDisplay = document.getElementById('textDisplay');

let isScrolling = false;
let scrollInterval;

textInput.addEventListener('input', () => {
    const textWithBreaks = textInput.value.replace(/\n/g, '<br>');
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
