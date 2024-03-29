const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
  
module.exports = (app) => {
  app.get('/api/pokemons', (req, res) => {
    if(req.query.name){ // indique qu'on souhaite extraire le parametre de requete name de l'url
       const name = req.query.name
       return Pokemon.findAndCountAll({ 
        where: { 
          name: { // name est la propriété  du modèle pokemon
            [Op.like]: `%${name}%` // 'name' est le critère de la recherche
          }
        },
        order: ['name'],
        limit: 5,
      })
      .then(({count, rows}) => {
        const message = `Il y a ${count} pokemons qui correspondent au terme de recherche ${name}.`
        res.json({ message, data: rows })
      })
    } else {
      Pokemon.findAll({ order: ['name'] })
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