const magicSquare = [
  [8, 1, 6],
  [3, 5, 7],
  [4, 9, 2]
];


const targetSum = 15; 
const squareContainer = document.getElementById("magic-square");

let preFilledCells = 0;
const max = 3; // Limit to 3 given number 

magicSquare.forEach((row, rowIndex) => {
  row.forEach((value, colIndex) => {
    const cell = document.createElement("div");
    cell.className = "square-cell";

    const input = document.createElement("input");
    input.type = "number";
    input.min = 1;
    input.max = 9;

    if (preFilledCells < max && Math.random() > 0.7) {
      input.value = value;
      input.disabled = true;
      preFilledCells++;
    }

    cell.appendChild(input);
    squareContainer.appendChild(cell);
  });
});


document.getElementById("check-button").addEventListener("click", () => {
  const inputs = document.querySelectorAll(".square-cell input");
  const grid = [];
  let index = 0;

  for (let i = 0; i < 3; i++) {
    grid[i] = [];
    for (let j = 0; j < 3; j++) {
      grid[i][j] = parseInt(inputs[index].value) || 0;
      index++;
    }
  }

  const isValid = checkMagicSquare(grid);
  const message = document.getElementById("message");
  if (isValid) {
    message.textContent = "Congratulations! You solved the magic square!";
    message.style.color = "green";
  } else {
    message.textContent = "Not quite right. Keep trying!";
    message.style.color = "red";
  }
});

function checkMagicSquare(grid) {
  // Check rows and columns
  for (let i = 0; i < 3; i++) {
    const rowSum = grid[i].reduce((sum, num) => sum + num, 0);
    const colSum = grid.reduce((sum, row) => sum + row[i], 0);

    if (rowSum !== targetSum || colSum !== targetSum) return false;
  }

  const diagonal1 = grid[0][0] + grid[1][1] + grid[2][2];
  const diagonal2 = grid[0][2] + grid[1][1] + grid[2][0];

  return diagonal1 === targetSum && diagonal2 === targetSum;
}
