const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
   
    if(req.query.name){ // indique qu'on souhaite extraire le parametre de requete name de l'url
       const name = req.query.name
       return Pokemon.findAll({ 
        where: { 
          name: { // name est la propriété  du modèle pokemon
            [Op.like]: `%${name}%` // 'name' est le critère de la recherche
          }
        },
        limit: 5,
      })
      .then(pokemons => {
        const message = `Il y a ${pokemons.length} pokemons qui correspondent au terme de recherche ${name}.`
        res.json({message, data: pokemons})
      })
    } else {
      Pokemon.findAll()
      .then(pokemons => {
        const message = 'La liste des pokémons a bien été récupérée.'
        res.json({ message, data: pokemons })
      })
      .catch(error => {
        const message = `La liste des pokemons n'a pas pu être récupérée. Réessayez dans quelques instants.`;
        res.status(500).json({ message, data: error})
      })
    }
  })
}