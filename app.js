const express = require('express');// Importe le module Express, un framework web pour Node.js
const helper = require('./helper.js') //Importe helper.js
let pokemons = require('./mock-pokemon');//importe la liste des pokémons

const app = express();// Crée une instance de l'application Express. serveur web où l'api rest va fonctionner
const port = 3000; // Définit le numéro de port sur lequel le serveur écoutera

app.get('/', (req, res) => res.send('Hello Express ! 😃'));// Définit une route pour la racine de l'application ('/')

app.get('/api/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id); // la methode find permet de récupérer un pokemon en fonction d'une certaine condition
    const message = 'Un pokemon a bien été trouvé.'
    res.json(helper.success(message, pokemon)); //renvoie des données en format json
});


app.get('/api/pokemons', (req, res) => {
    res.send(`Il y a ${pokemons.length} pokemons dans le pokedex, pour le moment.`)
});


// Lance le serveur sur le port spécifié et affiche un message dans la console indiquant que le serveur est en cours d'exécution
app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`));
