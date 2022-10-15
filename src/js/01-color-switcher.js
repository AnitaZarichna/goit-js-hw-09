const startBtn = document.querySelector(`[data-start]`);
const stopBtn = document.querySelector(`[data-stop]`);
const body = document.querySelector(`body`);
let timerID = null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

startBtn.addEventListener( `click` , onStartBtn);
stopBtn.addEventListener( `click` , onStopBtn);

function onStartBtn () {
startBtn.disabled = true;
stopBtn.disabled = false;
body.style.backgroundColor = getRandomHexColor ();
timerID = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
}, 1000);
}

function onStopBtn() {
    startBtn.disabled = false;
    stopBtn.disabled = true;
    clearInterval(timerID);
}