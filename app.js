const express = require('express');// Importe le module Express, un framework web pour Node.js
const morgan = require('morgan'); //importe morgan
const favicon = require('serve-favicon'); // import favicon
const bodyParser = require('body-parser'); 
const PokemonModel = require('./src/models/pokemon'); // importe le modèle pokemon
const sequelize = require('./src/db/sequelize')

const app = express();// Crée une instance de l'application Express. serveur web où l'api rest va fonctionner
const port = 3000; // Définit le numéro de port sur lequel le serveur écouter

app
    .use(favicon(__dirname + '/favicon.ico')) // middleware favicon
    .use(morgan('dev'))
    .use(bodyParser.json())

sequelize.initDb();

//ici nous placerons nos futurs points de terminaison.

// Lance le serveur sur le port spécifié et affiche un message dans la console indiquant que le serveur est en cours d'exécution
app.listen(port, () => console.log(`Notre application Node est démarrée sur http://localhost:${port}`));
