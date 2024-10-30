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

  playMessage(prenom = "ami") {
    const messages = [
      `Coucou ${prenom} ! J'ai un petit message du Père Noël ! Tu as été très gentil durant cette année, alors bravo, tu es sur la bonne voie pour recevoir ton joli cadeau ! On compte sur toi ! Tous les lutins te font d'énormes bisous !`,
      `Bonjour ${prenom} ! Le Père Noël m'a demandé de te dire qu'il est très fier de toi cette année. Continue ainsi et un super cadeau t'attend ! Gros bisous des lutins !`,
      `Coucou ! On dirait que Noël approche ? ${prenom}, tu as vraiment bien travaillé cette année, et ton cadeau est en route. Bravo et joyeux Noël !`,
      `Salut ${prenom} ! Le Père Noël m'a dit que tu as été exemplaire cette année ! Un beau cadeau est en préparation pour toi. Joyeux Noël et à très bientôt !`,
      `Coucou ${prenom} ! Les lutins m'ont dit que tu as été adorable toute l'année. Un cadeau spécial est prêt pour toi. Joyeux Noël de la part du Père Noël et des lutins !`,
    ];

    const message = messages[Math.floor(Math.random() * messages.length)];
    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "fr-FR";
    utterance.voice = this.loadVoices();

    console.log("Message généré :", message); // Vérifie le contenu du message
    console.log("Voix utilisée :", utterance.voice); // Vérifie la voix sélectionnée

    synth.speak(utterance);
  },
};

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
  if (element) new CircleType(element).radius(170);
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
    synth.onvoiceschanged = () => VoiceModule.loadVoices();
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
