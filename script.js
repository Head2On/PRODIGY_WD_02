// Selecting all the elements for the stopwatch display
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');

// Button elements
const startBtn = document.querySelector('.start-btn');
const lapBtn = document.querySelector('.lap-btn');
const resetBtn = document.querySelector('.reset-btn');

let hours = 0,
    minutes = 0,
    seconds = 0,
    milliseconds = 0;

let interval = null;
let isRunning = false;
let laps = []; // Array to store lap times

// Function to start the stopwatch
function startStopwatch() {
    if (!isRunning) {
        isRunning = true;
        interval = setInterval(updateTime, 10);
        startBtn.innerHTML = "<i class='bx bx-pause'></i>"; // Change button text to '||' when running
        lapBtn.style.opacity = '1'; 
        lapBtn.style.pointerEvents = 'auto';
        resetBtn.style.pointerEvents = 'auto';
    } else {
        // Pause functionality
        isRunning = false;
        clearInterval(interval);
        startBtn.innerHTML = "<i class='bx bx-play'></i>"; // Change button text back to 'Start' when paused
    }
}

// Function to update the time
function updateTime() {
    milliseconds += 1;

    if (milliseconds === 100) {
        milliseconds = 0;
        seconds++;
    }

    if (seconds === 60) {
        seconds = 0;
        minutes++;
    }

    if (minutes === 60) {
        minutes = 0;
        hours++;
    }

    // Update the display
    hoursDisplay.textContent = formatTime(hours);
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
    millisecondsDisplay.textContent = milliseconds < 10 ? `0${milliseconds}` : milliseconds;
}

// Function to reset the stopwatch
function resetStopwatch() {
    clearInterval(interval);
    isRunning = false;

    hours = 0;
    minutes = 0;
    seconds = 0;
    milliseconds = 0;

    // Update display to reset
    hoursDisplay.textContent = '00';
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';

    startBtn.innerHTML = "<i class='bx bx-play'></i>"; // Reset button back to 'Start'
    lapBtn.style.opacity = '0.6'; // Disable lap button after reset
    lapBtn.style.pointerEvents = 'none';
    resetBtn.style.pointerEvents = 'none'; // Disable reset button after reset

    laps = []; // Clear recorded laps
    displayLaps(); // Clear lap display
}

// Function to format the time values
function formatTime(value) {
    return value < 10 ? `0${value}` : value;
}

// Function to record laps
function recordLap() {
    if (isRunning) {
        // Create a formatted lap time
        const lapTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}:${formatTime(milliseconds)}`;
        laps.push(lapTime); // Add lap time to the array
        displayLaps(); // Update the displayed laps
    }
}

function displayLaps() {
    const lapsContainer = document.getElementById('lapsContainer'); // Select the laps container
    lapsContainer.innerHTML = '<h3>Laps:</h3>'; // Clear existing laps and add header
    laps.forEach((lap, index) => {
        lapsContainer.innerHTML += `<div>Lap ${index + 1}: ${lap}</div>`; // Add each lap to the display
    });
}

// Event listeners for buttons
startBtn.addEventListener('click', startStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);
