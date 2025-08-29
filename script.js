const startStopBtn = document.getElementById('startStopBtn');
const speedInput = document.getElementById('speed');
const fontSizeInput = document.getElementById('fontSize');
const textInput = document.getElementById('textInput');
const teleprompter = document.getElementById('teleprompter');
const textDisplay = document.getElementById('textDisplay');
const toggleEditorBtn = document.getElementById('toggleEditorBtn');

let isScrolling = false;
let scrollInterval;

textInput.addEventListener('input', () => {
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

toggleEditorBtn.addEventListener('click', () => {
    if (textInput.style.display === 'none') {
        textInput.style.display = 'block';
    } else {
        textInput.style.display = 'none';
    }
});
