const introScreen = document.getElementById("intro-screen");
const userForm = document.getElementById("user-form"); // Assure-toi que le formulaire a l'id "user-form"
const startButton = document.getElementById("start-button");
const countdown = document.getElementById("countdown");
const scoreDisplay = document.getElementById("score-display");
const progressBar = document.getElementById("progress-bar");

let counter = 0;
let gameDuration = 60; // Durée du jeu en secondes
let interval, countdownInterval;
let isUserRegistered = localStorage.getItem("isUserRegistered") === "true";

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
  clearInterval(interval); // Efface tout intervalle précédent de bulles
  clearInterval(countdownInterval); // Efface tout intervalle de compte à rebours précédent

  counter = 0;
  scoreDisplay.textContent = counter;

  // Réinitialise la largeur de la barre de progression
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
      replayButton.style.display = "block";
      progressBar.style.width = "0"; // Réinitialise la barre après le jeu
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

const quitButton = document.getElementById("quit-button"); // Bouton Quitter

// Gestion de la soumission du formulaire pour la première inscription
userForm.addEventListener("submit", (e) => {
  e.preventDefault(); // Empêche la soumission classique du formulaire
  isUserRegistered = true; // Marque l'utilisateur comme inscrit
  localStorage.setItem("isUserRegistered", "true"); // Enregistre dans le Local Storage
  introScreen.style.display = "none";
  quitButton.style.display = "block"; // Affiche le bouton Quitter pendant la partie
  startCountdown(); // Lance le compte à rebours
});

// Gestion de la relance directe du jeu sans formulaire
replayButton.addEventListener("click", () => {
  introScreen.style.display = "none";
  quitButton.style.display = "block"; // Affiche le bouton Quitter pendant la partie
  startCountdown(); // Lance le compte à rebours
});

// Fonction pour quitter la partie et revenir à l'écran d'accueil
const quitGame = () => {
  clearInterval(interval); // Arrête la génération de bulles
  clearInterval(countdownInterval); // Arrête le compte à rebours
  quitButton.style.display = "none"; // Cache le bouton Quitter
  introScreen.style.display = "block"; // Retourne à l'écran d'accueil
  replayButton.style.display = "block"; // Affiche le bouton Rejouer si déjà inscrit
};

// Gestion de l'événement de clic pour le bouton Quitter
quitButton.addEventListener("click", quitGame);

// Vérifie l'état d'inscription au chargement de la page
window.addEventListener("DOMContentLoaded", () => {
  if (isUserRegistered) {
    userForm.style.display = "none"; // Cache le formulaire si l'utilisateur est déjà inscrit
    replayButton.style.display = "block"; // Affiche le bouton Rejouer

    // Met à jour le texte lorsque l'utilisateur est déjà inscrit
    document.getElementById("intro-title").textContent = "Retente ta chance";
    document.getElementById("intro-text").textContent = "Jusqu'au 15 décembre";
  }
});
