const synth = window.speechSynthesis;
let voices = [];

// Fonction pour charger et sélectionner les voix féminines françaises
function chargerVoix() {
  voices = synth.getVoices();

  const voixFemininesFrancaises = voices.filter((voice) => {
    return (
      voice.lang === "fr-FR" &&
      (voice.name.includes("Google français") ||
        voice.name.includes("Microsoft Hortense") ||
        voice.name.includes("Amelie") ||
        voice.name.includes("Sophie"))
    );
  });

  return voixFemininesFrancaises.length > 0
    ? voixFemininesFrancaises[0]
    : voices[0];
}

// Fonction pour jouer un message aléatoire
function jouerMessage() {
  const prenom = document.getElementById("prenom").value || "ami";

  // Liste des messages
  const messages = [
    `Coucou ${prenom} ! J'ai un petit message du Père Noël ! Tu as été très gentil durant cette année, alors bravo, tu es sur la bonne voie pour recevoir ton joli cadeau ! On compte sur toi ! Tous les lutins te font d'énormes bisous !`,
    `Bonjour ${prenom} ! Le Père Noël m'a demandé de te dire qu'il est très fier de toi cette année. Continue ainsi et un super cadeau t'attend ! Gros bisous des lutins !`,
    `Coucou ! On dirait que Noël approche ? ${prenom}, tu as vraiment bien travaillé cette année, et ton cadeau est en route. Bravo et joyeux Noël !`,
    `Salut ${prenom} ! Le Père Noël m'a dit que tu as été exemplaire cette année ! Un beau cadeau est en préparation pour toi. Joyeux Noël et à très bientôt !`,
    `Coucou ${prenom} ! Les lutins m'ont dit que tu as été adorable toute l'année. Un cadeau spécial est prêt pour toi. Joyeux Noël de la part du Père Noël et des lutins !`,
  ];

  // Sélectionner un message aléatoire
  const message = messages[Math.floor(Math.random() * messages.length)];

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "fr-FR";

  const selectedVoice = chargerVoix();
  if (selectedVoice) {
    utterance.voice = selectedVoice;
  } else {
    console.warn("Aucune voix féminine française trouvée.");
  }

  synth.speak(utterance);
}

// Génération dynamique des lutins
function genererLutins() {
  const lutinContainer = document.querySelector(".lutin-container");

  for (let i = 1; i <= 10; i++) {
    const lutin = document.createElement("img");
    lutin.src = "./assets/lutinStar.png";
    lutin.alt = `Lutin animé ${i}`;
    lutin.classList.add("image-animée", `delay${i}`);
    lutinContainer.appendChild(lutin);
  }
}

// Gérer la touche "Entrée" et le bouton "Écouter"
function ajouterEventListeners() {
  const prenomInput = document.getElementById("prenom");
  const ecouterBtn = document.getElementById("ecouterBtn");

  prenomInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      jouerMessage();
    }
  });

  ecouterBtn.addEventListener("click", jouerMessage);
}

// Charger les voix lorsque la page est prête
window.onload = function () {
  if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = chargerVoix;
  }
  chargerVoix();
  ajouterEventListeners();
  genererLutins(); // Générer les lutins à l'ouverture de la page
};
