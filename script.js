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

function generateBoard() {
  $("#sudoku-table").empty();
  for (let row = 0; row < 9; row++) {
    let tr = $("<tr></tr>");
    for (let col = 0; col < 9; col++) {
      let td = $("<td></td>");
      let id = "Userrow" + row + "cell" + col;
      td.attr("id", id);
      
      if (puzzle[row][col] !== 0) {
        td.text(puzzle[row][col]);
      } else {
        let input = $("<input type='number' min='1' max='9' />");
        input.attr("id", `cell-${row}-${col}`);
        input.on('input', function() { checkCell(row, col, input); });
        td.append(input);
      }
      
      tr.append(td);
    }
    $("#sudoku-table").append(tr);
  }
}

function generateSolution() {
  $("#solution-table").empty();

  for (let row = 0; row < 9; row++) {
    let tr = $("<tr></tr>");
    for (let col = 0; col < 9; col++) {
      let td = $("<td></td>");
      let input = $("<input type='number' min='1' max='9' readonly />");
      input.val(solution[row][col]);
      let id = "Answerrow" + row + "cell" + col;
      input.attr("id", id);
      input.css("display", "none");
      td.append(input);
      tr.append(td);
      
      console.log("Generated ID: " + id);
    }
    $("#solution-table").append(tr);
  }
}

generateBoard();
generateSolution();

function checkCell(row, col, input) {
  const userId = `cell-${row}-${col}`;
  const answerId = `Answerrow${row}cell${col}`;

  const userValue = parseInt($(`#${userId}`).val(), 10);
  const answerValue = parseInt($(`#${answerId}`).val(), 10);

  if (userValue === answerValue) {
    $(`#${userId}`).css("background-color", "green");
  } else if (isNaN(userValue) || userValue === 0) {
    $(`#${userId}`).css("background-color", "");
  } else {
    $(`#${userId}`).css("background-color", "red");
  }

  checkComplete();
}

function checkComplete() {
  let isComplete = true;
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (puzzle[row][col] === 0) {
        const userId = `cell-${row}-${col}`;
        const answerId = `Answerrow${row}cell${col}`;
        
        const userValue = parseInt($(`#${userId}`).val(), 10);
        const answerValue = parseInt($(`#${answerId}`).val(), 10);

        if (userValue !== answerValue) {
          isComplete = false;
          break;
        }
      }
    }
    if (!isComplete) break;
  }

  if (isComplete) {
    alert("Congratulations! You've completed the puzzle correctly!");
  }
}
