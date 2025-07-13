const express = require('express');
const path = require('path');
const { mots } = require('./docs/mots.js');

const app = express();
const PORT = 3000;

// Serve static files from "public"
app.use(express.static(path.join(__dirname, 'docs')));

// Set up EJS (optional for now)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Function to generate stars
function generateStars(n) {
  return '★'.repeat(n) + '☆'.repeat(5 - n);
}

// Dynamic word route
app.get('/dictionnaire-mot/:mot.html', (req, res) => {
  const motParam = decodeURIComponent(req.params.mot);
  const mot = mots.find((m) => m.Mot.toLowerCase() === motParam.toLowerCase());

  if (!mot) {
    return res.status(404).send(`<h1>Mot "${motParam}" non trouvé</h1>`);
  }

  res.render('word', { mot, stars: generateStars(mot.Difficulté) });
});

app.get('/dictionnaire-mot/', (req, res) => {
    res.redirect('/dictionnaire-mot/index.html');
});

// Start server
app.listen(PORT, () => {
  console.log(`Serveur disponible : http://localhost:${PORT}`);
});