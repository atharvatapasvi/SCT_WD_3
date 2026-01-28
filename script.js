const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const pvpBtn = document.getElementById("pvpBtn");
const cpuBtn = document.getElementById("cpuBtn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;
let vsComputer = false;

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

pvpBtn.onclick = () => startGame(false);
cpuBtn.onclick = () => startGame(true);

function startGame(computerMode) {
  vsComputer = computerMode;
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  running = true;
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  cells.forEach(cell => cell.textContent = "");
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", () => startGame(vsComputer));

function handleCellClick() {
  const index = this.dataset.index;
  if (board[index] !== "" || !running) return;

  makeMove(index, currentPlayer);

  if (checkWinner()) return;

  switchPlayer();

  if (vsComputer && currentPlayer === "O" && running) {
    setTimeout(computerMove, 500);
  }
}

function makeMove(index, player) {
  board[index] = player;
  cells[index].textContent = player;
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      statusText.textContent = `🎉 Player ${board[a]} Wins!`;
      running = false;
      return true;
    }
  }

  if (!board.includes("")) {
    statusText.textContent = "It's a Draw!";
    running = false;
    return true;
  }
  return false;
}

function computerMove() {
  let emptyCells = board.map((val, i) => val === "" ? i : null).filter(v => v !== null);
  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  makeMove(randomIndex, "O");

  if (!checkWinner()) {
    switchPlayer();
  }
}
