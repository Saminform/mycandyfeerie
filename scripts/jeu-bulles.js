const introScreen = document.getElementById("intro-screen");
const userForm = document.getElementById("user-form");
const startButton = document.getElementById("start-button");
const countdown = document.getElementById("countdown");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");
const scoreboardBody = document.getElementById("scoreboard-body");
const replayButton = document.getElementById("replayButton");
const quitButton = document.getElementById("quit-button");
const finalScoreDisplay = document.getElementById("final-score");

let counter = 0;
let gameDuration = 60;
let interval, countdownInterval;
let isUserRegistered = localStorage.getItem("isUserRegistered") === "true";
let scores = [];
const bubbleMaker = () => {
  const bubble = document.createElement("span");
  bubble.classList.add("bubble");
  document.body.appendChild(bubble);

  const size = Math.random() * 200 + 100 + "px";
  bubble.style.height = size;
  bubble.style.width = size;
  bubble.style.top = Math.random() * 100 + 50 + "%";
  bubble.style.left = Math.random() * 100 + "%";
  const plusMinus = Math.random() > 0.5 ? 1 : -1;
  bubble.style.setProperty("--left", Math.random() * 100 * plusMinus + "%");

  bubble.addEventListener("click", () => {
    counter++;
    scoreDisplay.textContent = counter;
    bubble.remove();
  });

  setTimeout(() => bubble.remove(), 8000);
};

const startGame = () => {
  clearInterval(interval);
  clearInterval(countdownInterval);

  counter = 0;
  scoreDisplay.textContent = counter;
  progressBar.style.width = "100%";
  countdown.style.display = "none";

  interval = setInterval(bubbleMaker, 600);

  let timeRemaining = gameDuration;
  const progressInterval = setInterval(() => {
    timeRemaining--;
    progressBar.style.width = (timeRemaining / gameDuration) * 100 + "%";

    if (timeRemaining <= 0) {
      clearInterval(interval);
      clearInterval(progressInterval);

      finalScoreDisplay.style.display = "block";
      finalScoreDisplay.textContent = `Votre score : ${counter}`;

      // Récupérer les valeurs de nom et prénom du Local Storage si elles existent
      const firstName = localStorage.getItem("firstName");
      const lastName = localStorage.getItem("lastName");
      addScoreToBoard(firstName, lastName, counter);

      introScreen.style.display = "block";
      replayButton.style.display = "block";
      progressBar.style.width = "0";
    }
  }, 1000);
};

const startCountdown = () => {
  let countdownValue = 3;
  countdown.style.display = "block";
  countdown.textContent = countdownValue;

  countdownInterval = setInterval(() => {
    countdownValue--;
    countdown.textContent = countdownValue;

    if (countdownValue <= 0) {
      clearInterval(countdownInterval);
      startGame();
    }
  }, 1000);
};

userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  isUserRegistered = true;
  localStorage.setItem("isUserRegistered", "true");

  // Stocker les valeurs du formulaire dans le Local Storage
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("last-name").value;
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);

  introScreen.style.display = "none";
  quitButton.style.display = "block";
  startCountdown();
});

replayButton.addEventListener("click", () => {
  introScreen.style.display = "none";
  quitButton.style.display = "block";
  startCountdown();
});

quitButton.addEventListener("click", () => {
  clearInterval(interval);
  clearInterval(countdownInterval);
  quitButton.style.display = "none";
  introScreen.style.display = "block";
  replayButton.style.display = "block";
});

window.addEventListener("DOMContentLoaded", () => {
  if (isUserRegistered) {
    userForm.style.display = "none";
    replayButton.style.display = "block";
    document.getElementById("intro-title").textContent = "Retente ta chance";
    document.getElementById("intro-text").textContent = "Jusqu'au 15 décembre";
  }
});

function displayScores() {
  // Trier les scores du plus élevé au plus bas
  scores.sort((a, b) => b.score - a.score);
  const topScores = scores.slice(0, 10);

  scoreboardBody.innerHTML = "";
  topScores.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.firstName}</td>
      <td>${entry.lastName}</td>
      <td>${entry.score}</td>
    `;
    scoreboardBody.appendChild(row);
  });
}

function addScoreToBoard(firstName, lastName, score) {
  scores.push({ firstName, lastName, score });
  displayScores();
}

displayScores();
