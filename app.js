// Importe le module Express, un framework web pour Node.js
const express = require('express');
const { start } = require('repl');

// Crée une instance de l'application Express. serveur web où l'api rest va fonctionner
const app = express();

// Définit le numéro de port sur lequel le serveur écoutera
const port = 3000;

// Définit une route pour la racine de l'application ('/')
// Lorsque quelqu'un accède à la racine, le serveur répond avec le message "Hello Express! 😃"
app.get('/', (req, res) => res.send('Hello Express 2! 😃'));

app.get('/api/pokemon/:id', (req, res) => {
    const id = req.params.id
    res.send(`Vous avez demandé le pokémon ${id}`)
});



// Lance le serveur sur le port spécifié et affiche un message dans la console indiquant que le serveur est en cours d'exécution
app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`));
