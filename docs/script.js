import { mots } from './data.js';

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
  if (!container) return;
  const randomIndex = Math.floor(Math.random() * mots.length);
  const mot = mots[randomIndex];
  container.innerHTML = `
    <h2>${mot.Mot} ${generateStars(mot.Difficulté)}</h2>
    <p class="type">Type : <strong>${mot.Type || 'Non spécifié'}</strong></p>
    <p class="definition">${mot.Definition}</p>
    <p class="example">Exemple : "${mot.Exemple}"</p>
    <button id="get-another-word">J'en veux un autre !</button>
    <button class="btn-favorite" data-word="${mot.Mot}">❤ Ajouter aux favoris</button>
  `;

  document.getElementById("get-another-word").addEventListener("click", (e) => {
    e.preventDefault();
    showRandomWord();
  });
}

function showWordList() {
  const listContainer = document.getElementById("word-list");
  if (!listContainer) return;
  listContainer.innerHTML = mots
    .map((mot) => `<li><a href="/dictionnaire-mot/${encodeURIComponent(mot.Mot)}.html">${mot.Mot}</a></li>`)
    .join("");
}
function showFavorites() {
  const container = document.getElementById("favorites-container");
  if (!container) return;

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  if (favorites.length === 0) {
    container.innerHTML = "<p>Aucun mot favori pour l'instant.</p>";
    return;
  }

  const motsMap = Object.fromEntries(mots.map(m => [m.Mot.toLowerCase(), m]));

  container.innerHTML = favorites
    .map(word => {
      const mot = motsMap[word.toLowerCase()];
      return mot ? `
        <div class="favorite-word">
          <h3>${mot.Mot}</h3>
          <p><strong>Définition:</strong> ${mot.Definition}</p>
          <p><strong>Type:</strong> ${mot.Type}</p>
          <button class="btn-unfavorite" data-word="${mot.Mot}">❌ Retirer</button>
        </div>
      ` : '';
    })
    .join("");

  // Handle unfavorite button click
  container.querySelectorAll('.btn-unfavorite').forEach(btn => {
    btn.addEventListener('click', function () {
      const word = this.dataset.word;
      let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      favorites = favorites.filter(w => w !== word);
      localStorage.setItem('favorites', JSON.stringify(favorites));
      showFavorites(); // Refresh list
    });
  });
}

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('btn-favorite')) {
    const word = e.target.dataset.word;
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (!favorites.includes(word)) {
      favorites.push(word);
      alert(`${word} ajouté aux favoris !`);
    } else {
      favorites = favorites.filter(w => w !== word);
      alert(`${word} retiré des favoris.`);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  if (window.location.pathname === '/') {
    window.location.href = '/index.html';
  }
  if (window.location.pathname.endsWith("index.html")) {
    showRandomWord();
    showTopFavoritedWords();
  } else if (window.location.pathname.endsWith("list.html")) {
    showWordList();
  } else if (window.location.pathname.endsWith("favorites.html")) {
    showFavorites();
  }
});

function getTopFavoritedWords(motsList) {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

  // Count how many times each word was favorited
  const frequency = {};
  favorites.forEach(word => {
    frequency[word] = (frequency[word] || 0) + 1;
  });

  // Create an array of { word, count } objects
  const wordStats = Object.keys(frequency).map(word => ({
    word,
    count: frequency[word],
    data: motsList.find(m => m.Mot.toLowerCase() === word.toLowerCase())
  }));

  // Sort by most favorited
  wordStats.sort((a, b) => b.count - a.count);

  // Return top 10
  return wordStats.slice(0, 10);
}

function showTopFavoritedWords() {
  const container = document.getElementById("top-favorites");
  if (!container) return;

  const topWords = getTopFavoritedWords(mots);

  if (topWords.length === 0) {
    container.innerHTML = "<li>Aucun mot favori pour l'instant.</li>";
    return;
  }

  container.innerHTML = topWords
    .map(item => {
      const mot = item.data;
      return `
        <li>
          <strong>${mot?.Mot}</strong>
          (${item.count} fois ajouté)
          <p><em>${mot?.Definition}</em></p>
        </li>
      `;
    })
    .join("");
}