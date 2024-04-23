const message = document.getElementById("message");
const gameBoard = document.querySelector("#gameBoard");
const field = document.querySelectorAll(".field");
const restartBtn = document.querySelector("#resetBtn");


let board = [];
let gameEnded = false;
const playerX = "X";
const playerO = "O";

function displayController(currentPlayer) {
  message.innerHTML = `Player ${currentPlayer}'s turn`
}

function gameController() {
  currentPlayer = playerX;
  displayController(currentPlayer);

  field.forEach(field => {
    field.addEventListener("click", function () {
      if (gameEnded) {
        return;
      } else {
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
      gameEnded = true;
      const currentPlayer = field[a].innerHTML;
      message.innerHTML = `Player ${currentPlayer} wins!`;
      return;
    }
  }

  if (board.length === field.length) {
    gameEnded = true;
    message.innerHTML = "It's a draw!";
    return;
  }
}

function restartGame() {
  board = [];
  field.forEach((field) => {
    field.innerHTML = "";
  });
  currentPlayer = playerX;
  displayController(currentPlayer);
  gameEnded = false;
}


restartBtn.addEventListener("click", restartGame);
gameController();
