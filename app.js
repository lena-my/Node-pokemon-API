const express = require('express');// Importe le module Express, un framework web pour Node.js
const morgan = require('morgan'); //importe morgan
const favicon = require('serve-favicon'); // import favicon
const bodyParser = require('body-parser');
const { success, getUniqueId } = require('./helper.js'); //Importe helper.js
let pokemons = require('./mock-pokemon');//importe la liste des pokémons

const app = express();// Crée une instance de l'application Express. serveur web où l'api rest va fonctionner
const port = 3000; // Définit le numéro de port sur lequel le serveur écoutera

app
    .use(favicon(__dirname + '/favicon.ico')) // middleware favicon
    .use(morgan('dev'))
    .use(bodyParser.json())

/*app.use((req, res, next) => {
    console.log(`URL : ${req.url}`);
    next();
});*/

app.get('/', (req, res) => res.send('Hello Express ! 😃'));// Définit une route pour la racine de l'application ('/')

app.get('/api/pokemon/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id === id); // la methode find permet de récupérer un pokemon en fonction d'une certaine condition
    const message = 'Un pokemon a bien été trouvé.'
    res.json(success(message, pokemon)); //renvoie des données en format json
});

//on retourne la liste de pokemons
app.get('/api/pokemons', (req, res) => {
    const message = 'La liste de pokemons a bien été trouvée!';
    res.json(success(message, pokemons))
});

/* Ajouter un nouveau Pokémon */
app.post('/api/pokemons', (req, res) => {
    const id = getUniqueId(pokemons)
    const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
    pokemons.push(pokemonCreated)
    const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`
    res.json(success(message, pokemonCreated))
  })
    
//Modifier un pokemon
/*
app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id};
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon;
    })
    const message = `Le pokemon ${pokemonUpdated.name} a bien été modifié.`;
    res.json(success(message, pokemonUpdated));
})
*/
/*Modifier un Pokémon */
// ...

app.put('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pokemonUpdated = { ...req.body, id: id }
    pokemons = pokemons.map(pokemon => {
     return pokemon.id === id ? pokemonUpdated : pokemon
    })
     
    const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
    res.json(success(message, pokemonUpdated))
   });

/*  Supprimer un Pokémon */
app.delete('/api/pokemons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
    pokemons = pokemons.filter(pokemon => pokemon.id !== id)
    const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
    res.json(success(message, pokemonDeleted))
  });

// Lance le serveur sur le port spécifié et affiche un message dans la console indiquant que le serveur est en cours d'exécution
app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`));
