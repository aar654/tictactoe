const message = document.getElementById("message");
const gameBoard = document.querySelector("#gameBoard");
const field = document.querySelectorAll(".field");
const restartBtn = document.querySelector("#resetBtn");


let board = [];
const playerX = "X"
const playerO = "O"

function displayController(currentPlayer) {
  message.innerHTML = `Player ${currentPlayer}'s turn`
}

function gameController() {
  currentPlayer = playerX;
  displayController(currentPlayer);

  field.forEach(field => {
    field.addEventListener("click", function () {
      if (!field.innerHTML) {
        if (currentPlayer === playerX) {
          field.innerHTML = "X";
          board.push(Number(field.dataset.number));
          currentPlayer = playerO;
          displayController(currentPlayer);
          checkWinner(currentPlayer);
        } else if (currentPlayer === playerO) {
          field.innerHTML = "O";
          board.push(Number(field.dataset.number));
          currentPlayer = playerX;
          displayController(currentPlayer);
          checkWinner(currentPlayer);
        }
      }
    });
  });
}


function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (
      board.includes(a) &&
      board.includes(b) &&
      board.includes(c) &&
      field[a].innerHTML === field[b].innerHTML &&
      field[b].innerHTML === field[c].innerHTML
    ) {
      const currentPlayer = field[a].innerHTML;
      message.innerHTML = `Player ${currentPlayer} wins!`;
    }
  }

  // If no winner is found and all fields are filled, it's a draw
  if (board.length === field.length) {
    message.innerHTML = "It's a draw!";
  }
}

function restartGame() {
  board = [];
  currentPlayer = playerX;
  displayController(currentPlayer);

  field.forEach((field) => {
    field.innerHTML = "";
  });
}


restartBtn.addEventListener("click", restartGame);
gameController();
