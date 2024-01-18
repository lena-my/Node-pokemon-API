
const express = require('express');// Importe le module Express, un framework web pour Node.js

let pokemons = require('./mock-pokemon');//importe la liste des pokémons

const app = express();// Crée une instance de l'application Express. serveur web où l'api rest va fonctionner
const port = 3000; // Définit le numéro de port sur lequel le serveur écoutera

// Définit une route pour la racine de l'application ('/')
// Lorsque quelqu'un accède à la racine, le serveur répond avec le message "Hello Express! 😃"
app.get('/', (req, res) => res.send('Hello Express ! 😃'));

app.get('/api/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id); // la methode find permet de récupérer un pokemon en fonction d'une certaine condition
    res.send(`Vous avez demandé le pokémon ${pokemon.name}`);
});



// Lance le serveur sur le port spécifié et affiche un message dans la console indiquant que le serveur est en cours d'exécution
app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`));
