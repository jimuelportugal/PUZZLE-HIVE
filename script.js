const puzzle = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

const solution = [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

// Generate the puzzle grid dynamically
function generateBoard() {
  const table = document.getElementById("sudoku-table");
  table.innerHTML = "";

  for (let row = 0; row < 9; row++) {
    const tr = document.createElement("tr");
    for (let col = 0; col < 9; col++) {
      const td = document.createElement("td");
      if (puzzle[row][col] !== 0) {
        td.innerHTML = puzzle[row][col]; // Pre-filled cells
      } else {
        const input = document.createElement("input");
        input.type = "number";
        input.min = 1;
        input.max = 9;
        input.id = `cell-${row}-${col}`;
        td.appendChild(input);
      }
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
}

// Check if the user's solution is correct
function checkSolution() {
  let isCorrect = true;

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const userInput = document.getElementById(`cell-${row}-${col}`);
      if (userInput) {
        const value = parseInt(userInput.value, 10);
        if (value !== solution[row][col]) {
          isCorrect = false;
          userInput.style.backgroundColor = "red";
        } else {
          userInput.style.backgroundColor = "green";
        }
      }
    }
  }

  if (isCorrect) {
    alert("Congratulations! Your solution is correct.");
  } else {
    alert("Some of your answers are incorrect. Please try again.");
  }
}

// Reset the board for a new game
function resetBoard() {
  generateBoard();
}

generateBoard();
