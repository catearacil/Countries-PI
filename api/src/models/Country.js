const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// País con las siguientes propiedades: los * xq no pueden ser null (vacio)
// ID (Código de 3 letras) *
// Nombre *
// Imagen de la bandera *
// Continente *
// Capital *
// Subregión
// Área
// Población

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    id: {
      type: DataTypes.STRING(3),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flag: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continents: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subregion: {
      type: DataTypes.STRING,
      allowNull: true
    },
    area: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    population: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
   
  },{
    timestamps: false,
  });
};