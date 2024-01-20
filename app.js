const express = require('express');// Importe le module Express, un framework web pour Node.js
const morgan = require('morgan'); //importe morgan
const favicon = require('serve-favicon'); // import favicon
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize') // import le module sequelize et datatypes
const { success, getUniqueId } = require('./helper.js'); //Importe helper.js
let pokemons = require('./mock-pokemon');//importe la liste des pokémons
const PokemonModel = require('./src/models/pokemon'); // importe le modèle pokemon

const app = express();// Crée une instance de l'application Express. serveur web où l'api rest va fonctionner
const port = 3000; // Définit le numéro de port sur lequel le serveur écoutera

//conexion à la bd
const sequelize = new Sequelize(
    'pokedex', //nom de la bd
    'root', //identifiant par defaut
    '', //mot de passe
    {
        host: 'localhost',//indique où se trouve la bd sur ma machine
        dialect: 'mariadb',// driver qui permet l'interaction avec la bd
        dialectOptions: {
            timezone: 'Etc/GMT-2',
    },
    logging: false
  })

sequelize.authenticate()
    .then(_ => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.error(`Impossible de se connecter à la base de données ${error}`))

const Pokemon = PokemonModel(sequelize, DataTypes) //instancie le PokemonModel

sequelize.sync({force: true}) // la méthode sync synchronise l'instance Pokemon avec la bd 
/* 
force: true permet de supprimer complètement la table associée à chaque modèele avant d'effecture une synchronisation dans la bonne forme. 
On perd des données à chaque synchronisation. mais à terme on va se débarasser de l'option force.
cela permet de démarrer à chaque fois avec des données neuves à chaque démarrage de l'api rest
*/

  .then(_ => {
    console.log('La base de données "Pokedex" a bien été synchronisée.'),

    Pokemon.create({
        name: 'Bulbizzare',
        hp: 25,
        cp: 5,
        picture: 'http:/assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png',
        types: ["Plante", "Poison"].join() // join une chaine de carateres l'array
    }).then(bulbizarre => console.log(bulbizarre.toJSON())) // la méthode toJSON est recommandée pour afficher correctement les instances du modèle
  })

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
