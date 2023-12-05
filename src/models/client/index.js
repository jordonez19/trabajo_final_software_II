// modelos/clientes.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql");

const Client = sequelize.define(
  "Cliente",
  {
    dni: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
    },
    direccion_calle: {
      type: DataTypes.STRING(100),
    },
    direccion_numero: {
      type: DataTypes.STRING(20),
    },
    direccion_comuna: {
      type: DataTypes.STRING(50),
    },
    direccion_ciudad: {
      type: DataTypes.STRING(50),
    },
  },
  {
    timestamps: false,
    tableName: "clientes",
  }
);

module.exports = Client;
