import { mots } from "./data.js";

function generateStars(difficulty) {
  const maxStars = 5;
  let starsHTML = '';
  for (let i = 1; i <= maxStars; i++) {
    starsHTML += i <= difficulty ? '★' : '☆';
  }
  return starsHTML;
}

function showRandomWord() {
  const container = document.getElementById("word-container");
  const randomIndex = Math.floor(Math.random() * mots.length);
  const mot = mots[randomIndex];
  console.log(mot);
  container.innerHTML = `
    <h2>${mot.Mot} ${generateStars(mot.Difficulté)}</h2>
    <p class="type">Type : <strong>${mot.Type || 'Non spécifié'}</strong></p>
    <p class="definition">${mot.Definition}</p>
    <p class="example">Exemple : "${mot.Exemple}"</p>
    <button id="get-another-word">J'en veux un autre !</button>
  `;

  document.getElementById("get-another-word").addEventListener("click", (e) => {
    e.preventDefault();
    showRandomWord();
  });
}

function showWordList() {
  const listContainer = document.getElementById("word-list");
  listContainer.innerHTML = mots
    .map((mot) => `<li><a href="word.html?mot=${encodeURIComponent(mot.Mot)}">${mot.Mot}</a></li>`)
    .join("");
}

// Function to display details of a specific word
function showWordDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const word = urlParams.get("mot");

  const detailsContainer = document.getElementById("word-details");
  const mot = mots.find((m) => m.Mot === decodeURIComponent(word));
  console.log(mot);

  if (mot) {
    detailsContainer.innerHTML = `
      <h2>${mot.Mot} ${generateStars(mot.Difficulté)}</h2>
      <p class="type">Type : <strong>${mot.Type || 'Non spécifié'}</strong></p>
      <p class="definition">${mot.Definition}</p>
      <p class="example">Exemple : "${mot.Exemple}"</p>
    `;
  } else {
    detailsContainer.innerHTML = "<p>Mot non trouvé.</p>";
  }
}

// Event listener for getting another random word
const nextButton = document.getElementById("get-another-word");
if (nextButton) {
  nextButton.addEventListener("click", (e) => {
    e.preventDefault();
    showRandomWord();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname.endsWith("index.html")) {
    showRandomWord();
  } else if (window.location.pathname.endsWith("list.html")) {
    showWordList();
  } else if (window.location.pathname.endsWith("word.html")) {
    showWordDetails();
  }
});