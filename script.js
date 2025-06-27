document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cards-container");
  let currentIndex = 0;

  function generateStars(difficulty) {
    const maxStars = 5;
    let starsHTML = '';
    for (let i = 1; i <= maxStars; i++) {
      starsHTML += i <= difficulty ? '★' : '☆';
    }
    return starsHTML;
  }

  function showCard(index) {
    container.innerHTML = ""; // Clear previous card

    const mot = mots[index];
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${mot.Mot}</h2>
      <p class="info"><span>Première lettre :</span> ${mot["Première lettre"]}</p>
      <p class="info"><span>Définition :</span> ${mot.Définition}</p>
      <p class="info"><span>Type :</span> ${mot.Type}</p>
      <p class="info"><span>Exemple :</span> "${mot.Exemple}"</p>
      <p class="info"><span>Difficulté :</span> ${generateStars(mot.Difficulté)}</p>
      <a href="#" class="next-btn">Suivant →</a>
    `;

    container.appendChild(card);

    // Handle click on "Next"
    card.querySelector(".next-btn").addEventListener("click", (e) => {
      e.preventDefault();
      currentIndex = (currentIndex + 1) % mots.length;
      showCard(currentIndex);
    });
  }

  // Start showing first card
  showCard(currentIndex);
});