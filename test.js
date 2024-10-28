const introScreen = document.getElementById("intro-screen");
const startButton = document.getElementById("start-button");
const countdown = document.getElementById("countdown");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");

let counter = 0;
let gameDuration = 60; // Durée du jeu en secondes
let interval, countdownInterval;

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

  setTimeout(() => {
    bubble.remove();
  }, 8000);
};

const startGame = () => {
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
      alert(`Temps écoulé ! Votre score final est : ${counter}`);
      introScreen.style.display = "block";
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

// Gestion de l'événement de clic pour le démarrage
startButton.addEventListener("click", () => {
  introScreen.style.display = "none";
  startCountdown();
});
