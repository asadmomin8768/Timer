const minutesInput = document.getElementById("minutes");
const secondsInput = document.getElementById("seconds");
const display = document.getElementById("display");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

const alarm = document.getElementById("alarm");

let timer = null;
let totalSeconds = 0;

function updateDisplay() {

    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    display.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}

startBtn.addEventListener("click", () => {

    if (timer) return;

    if (totalSeconds === 0) {

        const mins = parseInt(minutesInput.value) || 0;
        const secs = parseInt(secondsInput.value) || 0;

        totalSeconds = mins * 60 + secs;

    }

    if (totalSeconds <= 0) return;

    updateDisplay();

    timer = setInterval(() => {

        totalSeconds--;

        updateDisplay();

        if (totalSeconds <= 0) {

            clearInterval(timer);
            timer = null;

            display.textContent = "00:00";

            alarm.currentTime = 0;
            alarm.play();

            // Stop the alarm after 5 seconds
            setTimeout(() => {
                alarm.pause();
                alarm.currentTime = 0;
            }, 5000);

        }

    }, 1000);

});

pauseBtn.addEventListener("click", () => {

    clearInterval(timer);
    timer = null;

});

resetBtn.addEventListener("click", () => {

    clearInterval(timer);
    timer = null;

    totalSeconds = 0;

    minutesInput.value = "";
    secondsInput.value = "";

    display.textContent = "00:00";

});