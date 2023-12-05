// modelos/categorias.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql");

const Category = sequelize.define(
  "Categorias",
  {
    id_categoria: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
    },
    descripcion: {
      type: DataTypes.TEXT,
    },
  },
  {
    timestamps: false,
    tableName: "categorias",
  }
);

module.exports = Category;
