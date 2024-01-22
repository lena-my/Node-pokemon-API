/* L’API Rest et la Base de données : Créer un modèle Sequelize */

module.exports = (sequelize, DataTypes) => { // export de 2 fonctions avec 2 parametres
    
    //on retourne le résultat de la méthode define
    return sequelize.define('Pokemon', { // nom du modèle
      
      /*description du modèle*/
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split('')
        },
        set() {
          return this.setDataValue('types', types.join())
        }
      }
    }, 
    
    /* option de parametrage globale */
    {
      timestamps: true, // indique qu'onsouhaite modifier le comportement par defaut
      createdAt: 'created', // renomé 'createdAt' contre 'created'
      updatedAt: false // desactiver 'updatedAt'
    })
  }