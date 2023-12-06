// modelos/proveedores.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql");

const Provider = sequelize.define(
  "Proveedor",
  {
    dni_provedor: {
      type: DataTypes.STRING(50),
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
    },
    direccion: {
      type: DataTypes.STRING(100),
    },
    telefono: {
      type: DataTypes.STRING(20),
    },
    pagina_web: {
      type: DataTypes.STRING(100),
    },
  },
  {
    timestamps: false,
    tableName: "proveedores",
  }
);
module.exports = Provider;
