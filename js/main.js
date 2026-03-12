let boardElement = document.getElementById("board");
let boardArray = [];
const bombsCount = 6;

function drawBoard(x, y, shuffle) {
    boardElement.innerHTML = "";
    boardArray = [];

    for (let i = 0; i < x * y; i++) {
        boardArray.push({
            id: i,
            isBomb: false,
        });
    }
    
    placeBombs();

    if (shuffle) {
        shuffleBoard(boardArray);
    }

    for (let i = 0; i < boardArray.length; i++) {
        boardElement.innerHTML += `<div class="box" id="box-${boardArray[i].id}" data-index="${i}"></div>`;
    }
    
    styleBoard();
}

function shuffleBoard(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function placeBombs() {
    for (let i = 0; i < bombsCount; i++) {
        boardArray[i].isBomb = true;
    }
}

function styleBoard() {
    let boxes = document.getElementsByClassName("box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].style.backgroundColor = "var(--color-board-bg)";
        boxes[i].style.border = "1px solid dimgrey";
        boxes[i].style.borderRadius = "5px";
        boardElement.style.gap = "2px";
    }
}

function eventsShowField() {
    let boxes = document.getElementsByClassName("box");
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener("click", function() {
            let index = this.getAttribute("data-index");
            let field = boardArray[index];

            if (field.isBomb) {
                this.innerHTML = `<p>○</p>`;
                this.style.backgroundColor = "red";
                setTimeout(() => alert("Vesztettél!"), 10);
            } else {
                let count = countBombs(index);
                this.innerHTML = `<p>${count}</p>`;
                this.style.backgroundColor = "transparent";
            }
        });
    }
}

function countBombs(index) {
    let count = 0;
    let size = Math.sqrt(boardArray.length);
    let row = Math.floor(index / size);
    let col = index % size;
    for (let r = -1; r <= 1; r++) {
        for (let c = -1; c <= 1; c++) {
            let ni = (row + r) * size + (col + c);
            if (row + r >= 0 && row + r < size && col + c >= 0 && col + c < size) {
                if (boardArray[ni].isBomb) count++;
            }
        }
    }
    return count;
}

drawBoard(10, 10, true);
eventsShowField();

let newGame = document.querySelector("button");
newGame.addEventListener("click", function() {
    drawBoard(10, 10, true);
    eventsShowField();
});
