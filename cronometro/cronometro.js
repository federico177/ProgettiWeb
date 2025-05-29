let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

function timeToString(time) {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    const minStr = minutes.toString().padStart(2, '0');
    const secStr = seconds.toString().padStart(2, '0');
    const msStr = milliseconds.toString().padStart(2, '0');

    return `${minStr}:${secStr}:${msStr}`;
}

function updateDisplay() {
    const time = Date.now() - startTime;
    elapsedTime = time;
    document.getElementById("time").textContent = timeToString(time);
}

function start() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function stop() {
    clearInterval(timerInterval);
    running = false;
}

function reset() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    running = false;
    document.getElementById("time").textContent = "00:00:00";
    document.getElementById("laps").innerHTML = "";
}

function lap() {
    if (running) {
        const lapTime = timeToString(elapsedTime);
        const li = document.createElement("li");
        li.textContent = lapTime;
        document.getElementById("laps").appendChild(li);
    }
}

document.getElementById("start").addEventListener("click", start);
document.getElementById("stop").addEventListener("click", stop);
document.getElementById("reset").addEventListener("click", reset);
document.getElementById("lap").addEventListener("click", lap);
