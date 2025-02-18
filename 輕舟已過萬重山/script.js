const gridSize = { rows: 5, cols: 4 };
const gridContainer = document.getElementById("grid");

// Team positions
let teamA = { row: 0, col: 0 };
let teamB = { row: 4, col: 0 };

// Create the grid dynamically
function createGrid() {
    gridContainer.innerHTML = "";
    for (let r = -1; r < gridSize.rows; r++) {
        for (let c = -1; c < gridSize.cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            if (r === -1 && c >= 0) {
                // Top header (A, B, C, D)
                cell.innerText = String.fromCharCode(65 + c);
                cell.classList.add("header");
            } else if (c === -1 && r >= 0) {
                // Left header (1, 2, 3, 4, 5)
                cell.innerText = r + 1;
                cell.classList.add("header");
            } else if (r >= 0 && c >= 0) {
                // Normal grid cell
                cell.dataset.row = r;
                cell.dataset.col = c;

                // Mark D3 as the end block
                if (r === 2 && c === 3) {
                    cell.classList.add("end");
                    cell.innerText = "終點";
                    cell.style.backgroundColor = "#799496";
                    cell.style.color = "#FFFFFF";
                }
            }
            gridContainer.appendChild(cell);
        }
    }
    updateMarkers();
}

// Update team positions on the grid
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

    // Handle overlap scenario
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
        // Reset to original size if not overlapping
        markerA.style.width = "30px";
        markerA.style.height = "30px";
        markerB.style.width = "30px";
        markerB.style.height = "30px";
    }
}

// Move a team in a specific direction
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

// Initialize the grid
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

function updateTime_MAIN() {
    const now = new Date();
    const optionsDate = { year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

    const formattedDate = now.toLocaleDateString('en-GB', optionsDate);
    const formattedTime = now.toLocaleTimeString('en-GB', optionsTime);

    document.getElementById('date_MAIN').innerText = formattedDate;
    document.getElementById('time_MAIN').innerText = formattedTime;
}

updateTime(); // Initial call to display the time immediately
setInterval(updateTime, 1000); // Update every second
setInterval(updateTime_MAIN, 1000);

document.getElementById('close').onclick = function() {
    document.getElementById('timer').remove()
}
