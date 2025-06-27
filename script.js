document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("cards-container");

    function generateStars(difficulty) {
        const maxStars = 5;
        let starsHTML = '';

        for (let i = 1; i <= maxStars; i++) {
            if (i <= difficulty) {
            starsHTML += '★';
            } else {
            starsHTML += '☆';
            }
        }

        return starsHTML;
    }

  mots.forEach(mot => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h2>${mot.Mot}</h2>
      <p class="info"><span>Première lettre :</span> ${mot["Première lettre"]}</p>
      <p class="info"><span>Définition :</span> ${mot.Définition}</p>
      <p class="info"><span>Type :</span> ${mot.Type}</p>
      <p class="info"><span>Exemple :</span> "${mot.Exemple}"</p>
      <p class="info"><span>Difficulté :</span> ${generateStars(mot.Difficulté)}</p>
    `;

    container.appendChild(card);
  });
});