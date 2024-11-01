const synth = window.speechSynthesis;
let voices = [];

// Module de synthèse vocale
const VoiceModule = {
  loadVoices() {
    voices = synth.getVoices();
    const frenchFemaleVoices = voices.filter((voice) => {
      return (
        voice.lang === "fr-FR" &&
        (voice.name.includes("Google français") ||
          voice.name.includes("Microsoft Hortense") ||
          voice.name.includes("Amelie") ||
          voice.name.includes("Sophie"))
      );
    });

    return frenchFemaleVoices.length > 0 ? frenchFemaleVoices[0] : voices[0];
  },
};

function playMessage(prenom) {
  const messages = [
    {
      audio: "./assets/audio/lutin2.mp3",
    },
    {
      audio: "./assets/audio/lutin1.mp3",
    },
    {
      audio: "./assets/audio/lutin3.mp3",
    },
    {
      audio: "./assets/audio/lutin4.mp3",
    },
    {
      audio: "./assets/audio/Pereno1.mp3",
    },
  ];

  // Sélectionne un message aléatoire dans le tableau
  const message = messages[Math.floor(Math.random() * messages.length)];

  // Charge la voix française féminine
  const selectedVoice = VoiceModule.loadVoices();

  // Création de l'introduction avec le prénom et la voix française
  const introMessage = `Coucou ${prenom} ! il ya un message pour toi. Peut-être aura tu celui du Père Noël!`;
  const introSpeech = new SpeechSynthesisUtterance(introMessage);
  introSpeech.voice = selectedVoice; // Définit la voix française sélectionnée

  // Lecture de l'audio MP3 après l'introduction
  introSpeech.onend = () => {
    const audio = new Audio(message.audio);
    audio.play();
  };

  // Démarre la lecture de l'introduction
  window.speechSynthesis.speak(introSpeech);
}

// Vérifie si la touche "Entrée" est pressée dans le champ de texte
function verifierEntree(event) {
  if (event.key === "Enter") {
    lireMessage();
  }
}

// Fonction pour capturer le prénom et jouer le message
function lireMessage() {
  const prenomInput = document.getElementById("prenom");
  const prenom = prenomInput.value.trim(); // Récupère le prénom

  if (prenom) {
    playMessage(prenom); // Joue le message avec le prénom
  } else {
    alert("Veuillez entrer votre prénom pour écouter le message.");
  }
}

// Ajoute un événement de clic pour le bouton "Écouter"
document.getElementById("ecouterBtn").addEventListener("click", lireMessage);

// ________________________________________________________L U T I N S__________________________________________
// Module de gestion des lutins
const LutinModule = {
  adjustLutins() {
    const lutinContainer = document.querySelector(".lutin-container");
    lutinContainer.innerHTML = "";

    const windowWidth = window.innerWidth;
    let numberOfLutins =
      windowWidth > 1200
        ? 9
        : windowWidth > 800
        ? 7
        : windowWidth > 600
        ? 5
        : 3;

    for (let i = 1; i <= numberOfLutins; i++) {
      const lutin = document.createElement("img");
      lutin.src = "./assets/lutinStar.png";
      lutin.alt = `Lutin animé ${i}`;
      lutin.classList.add("image-animée", `delay${i}`, `lutin-${i}`);
      lutinContainer.appendChild(lutin);
    }

    this.hideSpecificLutins([2, 6, 9]);
  },

  hideSpecificLutins(lutinsToHide) {
    lutinsToHide.forEach((num) => {
      const lutin = document.querySelector(`.lutin-${num}`);
      if (lutin) {
        lutin.style.visibility = "hidden";
      }
    });
  },
};

// Fonction pour courber le texte
function applyTextCurve() {
  const element = document.getElementById("arche");
  if (element) new CircleType(element).radius(150);
}

// Gérer les interactions utilisateur
function setupEventListeners() {
  const prenomInput = document.getElementById("prenom");
  const ecouterBtn = document.getElementById("ecouterBtn");

  if (prenomInput) {
    prenomInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        VoiceModule.playMessage(prenomInput.value);
      }
    });
  }

  if (ecouterBtn) {
    ecouterBtn.addEventListener("click", () => {
      VoiceModule.playMessage(prenomInput.value);
    });
  }
}

// Initialisation de la page et des modules
function init() {
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = VoiceModule.loadVoices;
  }
  VoiceModule.loadVoices();
  setupEventListeners();
  LutinModule.adjustLutins();
  applyTextCurve();

  window.addEventListener("resize", () => {
    LutinModule.adjustLutins();
  });
}

// Lancer l'initialisation au chargement de la page
window.onload = init;
