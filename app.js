const qDiv = document.querySelector(".question");
qDiv.className = "question";
const btn = document.getElementById("btn");
const input = document.querySelector("input");
const main = document.querySelector("main");
const gameDiv = document.querySelector(".game");
const pointsNeeded = document.querySelector(".points-needed");
const mistakesAllowed = document.querySelector(".mistakes-allowed");

let random1 = Math.floor(Math.random() * 10) + 1;
let random2 = Math.floor(Math.random() * 10) + 1;
let operators = ["+", "-", "x", "/"];
let randomOperator = operators[Math.floor(Math.random() * operators.length)];
let question = `${random1} ${randomOperator} ${random2}`;
input.focus();
const state = {
  score: 0,
  progress: 0,
  wrongAnswers: 0,
};

createQuestion();

function createQuestion() {
  qDiv.textContent = `Q: ${question}`;
  getAnswer();
}

function getAnswer() {
  let answer;
  if (randomOperator === "+") answer = random1 + random2;
  if (randomOperator === "-") answer = random1 - random2;
  if (randomOperator === "/") answer = +(random1 / random2).toFixed(1);
  if (randomOperator === "x") answer = random1 * random2;
  console.log(answer);

  return answer;
}

btn.addEventListener("click", checkAnswer);

function checkAnswer() {
  const userAnswer = +input.value;
  console.log(getAnswer());
  console.log(userAnswer);
  if (+userAnswer == getAnswer()) {
    state.progress++;
    pointsNeeded.innerHTML = `Score ${state.progress}/10`;
  } else {
    state.wrongAnswers++;
    mistakesAllowed.textContent = `Mistakes ${state.wrongAnswers}/3`;
  }

  checkEnd();
  nextQ();
}

function nextQ() {
  input.value = "";
  random1 = Math.floor(Math.random() * 10) + 1;
  random2 = Math.floor(Math.random() * 10) + 1;
  operators = ["+", "-", "x", "/"];
  randomOperator = operators[Math.floor(Math.random() * operators.length)];
  qDiv.textContent = "";
  question = `${random1} ${randomOperator} ${random2}`;
  input.focus();
  createQuestion();
}
function checkEnd() {
  let won = state.progress == 10;
  let lost = state.wrongAnswers == 3;

  if (won || lost) {
    const endMessage = document.createElement("div");

    endMessage.className = "end-message";
    gameDiv.className = "game end";

    const playAgain = document.createElement("button");
    playAgain.textContent = "Play again";
    playAgain.className = "play-again btn";

    const endText = document.createElement("p");
    if (won) {
      endText.textContent = "You Won!";
    } else {
      endText.textContent = "You Lost";
    }
    document.body.appendChild(endMessage);
    endMessage.appendChild(endText);
    endMessage.appendChild(playAgain);
    playAgain.focus();
    main.appendChild(endMessage);

    playAgain.addEventListener("click", reset);
  }
}

function reset() {
  const endMessage = document.querySelector(".end-message");
  console.log(endMessage);
  gameDiv.className = "game";
  createQuestion();
  endMessage.remove();
  state.progress = 0;
  state.wrongAnswers = 0;
  pointsNeeded.textContent = "Score 0/10";
  mistakesAllowed.textContent = "Mistakes 0/3";
}
