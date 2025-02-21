const gridSize = { rows: 5, cols: 4 };
const gridContainer = document.getElementById("grid");

let teamA = { row: 0, col: 0 };
let teamB = { row: 4, col: 0 };

function createGrid() {
    gridContainer.innerHTML = "";
    for (let r = -1; r < gridSize.rows; r++) {
        for (let c = -1; c < gridSize.cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (r === -1 && c >= 0) {
                cell.innerText = String.fromCharCode(65 + c);
                cell.classList.add("header");
            } else if (c === -1 && r >= 0) {
                cell.innerText = r + 1;
                cell.classList.add("header");
            } else if (r >= 0 && c >= 0) {
                cell.dataset.row = r;
                cell.dataset.col = c;

                if (r === 2 && c === 3) {
                    cell.classList.add("end");
                    cell.innerText = "終點";
                    cell.style.backgroundColor = "#799496";
                    cell.style.color = "#FFFFFF";
                }
                if (r === 0 && c === 0) {
                    cell.style.backgroundColor = "#f0b9c1";
                }
                if (r === 4 && c === 0) {
                    cell.style.backgroundColor = "#9adcff";
                }
            }
            gridContainer.appendChild(cell);
        }
    }
    updateMarkers();
}

function updateMarkers() {
    document.querySelectorAll(".marker").forEach(marker => marker.remove());

    const teamACell = document.querySelector(`.cell[data-row="${teamA.row}"][data-col="${teamA.col}"]`);
    const markerA = document.createElement("div");
    markerA.classList.add("marker", "teamA");
    teamACell.appendChild(markerA);

    const teamBCell = document.querySelector(`.cell[data-row="${teamB.row}"][data-col="${teamB.col}"]`);
    const markerB = document.createElement("div");
    markerB.classList.add("marker", "teamB");
    teamBCell.appendChild(markerB);

    if (teamA.row === teamB.row && teamA.col === teamB.col) {
        markerA.style.width = "25px";
        markerA.style.height = "25px";
        markerB.style.width = "25px";
        markerB.style.height = "25px";
        markerA.style.top = "4px";
        markerA.style.left = "4px";
        markerB.style.bottom = "4px";
        markerB.style.right = "4px";
    } else {
        markerA.style.width = "30px";
        markerA.style.height = "30px";
        markerB.style.width = "30px";
        markerB.style.height = "30px";
    }
}

function move(team, direction) {
    let teamObj = team === "A" ? teamA : teamB;

    switch (direction) {
        case "up":
            if (teamObj.row > 0) teamObj.row--;
            break;
        case "down":
            if (teamObj.row < gridSize.rows - 1) teamObj.row++;
            break;
        case "left":
            if (teamObj.col > 0) teamObj.col--;
            break;
        case "right":
            if (teamObj.col < gridSize.cols - 1) teamObj.col++;
            break;
    }
    updateMarkers();
}

document.addEventListener('keydown', function(event) {
    const inputField = document.getElementById('setTime');

    // Prevent keydown handling if the input field is focused
    if (inputField === document.activeElement || document.getElementById('timer')) {
        return;
    }

    switch (event.key) {
        // WASD keys for Player A
        case 'w':
        case 'W':
            move("A", "up");
            break;
        case 'a':
        case 'A':
            move("A", "left");
            break;
        case 's':
        case 'S':
            move("A", "down");
            break;
        case 'd':
        case 'D':
            move("A", "right");
            break;

        // Arrow keys for Player B
        case 'ArrowUp':
            move("B", "up");
            break;
        case 'ArrowLeft':
            move("B", "left");
            break;
        case 'ArrowDown':
            move("B", "down");
            break;
        case 'ArrowRight':
            move("B", "right");
            break;

        default:
            break;
    }
});

createGrid();

function updateTime() {
    const now = new Date();
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

    const formattedDate = now.toLocaleDateString('en-GB', optionsDate);
    const formattedTime = now.toLocaleTimeString('en-GB', optionsTime);

    document.getElementById('date').innerText = formattedDate;
    document.getElementById('time').innerText = formattedTime;
}

updateTime();
setInterval(updateTime, 1000);

document.getElementById('close').onclick = function() {
    document.getElementById('timer').remove();
}

let countdownTime, timerInterval;
let running = false;

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateDisplay() {
    if (countdownTime > 0) {
        countdownTime--;
        document.getElementById('timeDisplay').innerText = formatTime(countdownTime);
    } else {
        clearInterval(timerInterval);
        document.getElementById('pop-up').style.opacity = "1";
        document.getElementById('closePOPUP').disabled = false;
        resetTimer();
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    running = false;
    countdownTime = 0;
    document.getElementById('timeDisplay').innerText = '00:00:00';
    document.getElementById('startBtn').disabled = false;
    document.getElementById('pauseBtn').disabled = true;
    document.getElementById('resetBtn').disabled = true;
    document.getElementById('pauseBtn').innerText = 'Pause';
    document.getElementById('pauseBtn').style.backgroundColor = "#ebd278";
}

document.getElementById('startBtn').addEventListener('click', function () {
    if (!running) {
        const seconds = parseInt(document.getElementById('setTime').value) || 0;
        countdownTime = seconds;
        document.getElementById('timeDisplay').innerText = formatTime(countdownTime);
        timerInterval = setInterval(updateDisplay, 1000);
        running = true;
        this.disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        document.getElementById('resetBtn').disabled = false;
    }
});

document.getElementById('pauseBtn').addEventListener('click', function () {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        this.innerText = 'Continue';
        this.style.backgroundColor = "#92cfe0";
    } else {
        timerInterval = setInterval(updateDisplay, 1000);
        running = true;
        this.innerText = 'Pause';
        this.style.backgroundColor = "#ebd278";
    }
});

document.getElementById('resetBtn').addEventListener('click', resetTimer);

document.getElementById('closePOPUP').onclick = function() {
    document.getElementById('pop-up').style.opacity = "0";
    document.getElementById('closePOPUP').disabled = true;
}
