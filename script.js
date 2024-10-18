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

// Fonction pour ajuster dynamiquement le nombre de lutins en fonction de la taille de la fenêtre
function ajusterNombreLutins() {
  const lutinContainer = document.querySelector(".lutin-container");

  // Supprimer les lutins actuels
  lutinContainer.innerHTML = "";

  // Calculer le nombre de lutins en fonction de la largeur de la fenêtre
  const windowWidth = window.innerWidth;
  let nombreLutins;

  if (windowWidth > 1200) {
    nombreLutins = 9; // Grand écran
  } else if (windowWidth > 800) {
    nombreLutins = 7; // Écran moyen
  } else if (windowWidth > 600) {
    nombreLutins = 5; // Petite tablette
  } else {
    nombreLutins = 3; // Smartphone
  }

  // Générer les lutins avec des classes uniques
  for (let i = 1; i <= nombreLutins; i++) {
    const lutin = document.createElement("img");
    lutin.src = "./assets/lutinStar.png";
    lutin.alt = `Lutin animé ${i}`;
    lutin.classList.add("image-animée", `delay${i}`, `lutin-${i}`); // Ajout d'une classe unique
    lutinContainer.appendChild(lutin);
  }

  // Appeler la fonction pour cacher certains lutins en fonction de leur numéro
  cacherLutinsParNumero();
}

// Fonction pour rendre invisibles certains lutins (ex : lutins 1, 3, 6, et 8) tout en conservant leur position
function cacherLutinsParNumero() {
  // Cacher les lutins 1, 3, 6, et 8
  const lutinsAEnlever = [1, 2]; // Liste des lutins à cacher

  lutinsAEnlever.forEach((num) => {
    const lutin = document.querySelector(`.lutin-${num}`);
    if (lutin) {
      lutin.style.visibility = "hidden"; // Rend le lutin invisible mais conserve son espace
    }
  });
}

// Appliquer CircleType pour courber le texte "La féérie des lutins"
function courberTexte() {
  const element = document.getElementById("arche");
  new CircleType(element).radius(180); // Appliquer un rayon de 300px à l'arche
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
  ajusterNombreLutins(); // Générer les lutins en fonction de la taille de la fenêtre au chargement
  courberTexte(); // Courber le texte une fois la page chargée

  // Écoute les événements de redimensionnement de la fenêtre pour ajuster les lutins
  window.addEventListener("resize", ajusterNombreLutins);
};
