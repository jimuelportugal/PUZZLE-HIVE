
function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num || board[i][col] === num) return false;

        const gridRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const gridCol = 3 * Math.floor(col / 3) + (i % 3);
        if (board[gridRow][gridCol] === num) return false;
    }
    return true;
}


function solveBoard(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveBoard(board)) {
                            return true;
                        }
                        board[row][col] = 0; 
                    }
                }
                return false;
            }
        }
    }
    return true; 
}

function generateFullBoard() {
    let board = Array.from({ length: 9 }, () => Array(9).fill(0));
    solveBoard(board);
    return board;
}

function removeNumbers(board, difficulty) {
    let cellsToRemove;
    switch (difficulty) {
        case 'easy':
            cellsToRemove = 30;
            break;
        case 'medium':
            cellsToRemove = 40;
            break;
        case 'hard':
            cellsToRemove = 50;
            break;
        default:
            cellsToRemove = 30;
    }

    while (cellsToRemove > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            cellsToRemove--;
        }
    }
}

function isBoardComplete() {
    const cells = document.querySelectorAll('#sudoku-board input');
    let board = Array.from({ length: 9 }, () => Array(9).fill(0));

    cells.forEach((cell, index) => {
        const row = Math.floor(index / 9);
        const col = index % 9;
        const value = parseInt(cell.value, 10);

        if (!value || value < 1 || value > 9) {
            return false;
        }

        board[row][col] = value;
    });

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const num = board[row][col];
            board[row][col] = 0; 
            if (!isValid(board, row, col, num)) {
                return false;
            }
            board[row][col] = num;
        }
    }

    return true; 
}

function createGrid(board) {
    const boardContainer = document.getElementById('sudoku-board');
    boardContainer.innerHTML = ''; 

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const cell = document.createElement('input');
            cell.type = 'number';
            cell.min = '1';
            cell.max = '9';
            cell.value = board[i][j] !== 0 ? board[i][j] : '';
            cell.disabled = board[i][j] !== 0; 

            cell.addEventListener('input', () => {
                if (isBoardComplete()) {
                    alert('Congratulations! You have completed the game!');
                }
            });

            boardContainer.appendChild(cell);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let board = generateFullBoard();
    removeNumbers(board, 'medium');
    createGrid(board);
});
