const startStopBtn = document.getElementById('startStopBtn');
const scrollUpBtn = document.getElementById('scrollUpBtn');
const scrollDownBtn = document.getElementById('scrollDownBtn');
const speedInput = document.getElementById('speed');
const fontSizeInput = document.getElementById('fontSize');
const textInput = document.getElementById('textInput');
const teleprompter = document.getElementById('teleprompter');
const textDisplay = document.getElementById('textDisplay');
const toggleInputBtn = document.getElementById('toggleInputBtn');
const recordBtn = document.getElementById('recordBtn');
const cameraFeed = document.getElementById('camera-feed');
const recordedVideo = document.getElementById('recorded-video');

let isScrolling = false;
let scrollInterval;
let mediaRecorder;
let recordedChunks = [];

// Access Camera and Mic
navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then((stream) => {
    cameraFeed.srcObject = stream;
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'video/webm' });
      recordedChunks = [];
      const videoURL = URL.createObjectURL(blob);
      recordedVideo.src = videoURL;
      recordedVideo.hidden = false;
      cameraFeed.hidden = true;
    };
  })
  .catch((err) => {
    console.error('Error accessing media devices: ', err);
  });

recordBtn.addEventListener('click', () => {
  if (mediaRecorder.state === 'recording') {
    mediaRecorder.stop();
    recordBtn.textContent = 'Start Recording';
  } else {
    recordedChunks = [];
    mediaRecorder.start();
    recordBtn.textContent = 'Stop Recording';
    recordedVideo.hidden = true;
    cameraFeed.hidden = false;
  }
});

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
    const speed = parseInt(speedInput.value, 10) / 20;
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

toggleInputBtn.addEventListener('click', () => {
  textInput.classList.toggle('hidden');
  if (textInput.classList.contains('hidden')) {
    toggleInputBtn.innerText = 'Show Input';
  } else {
    toggleInputBtn.innerText = 'Hide Input';
  }
});
