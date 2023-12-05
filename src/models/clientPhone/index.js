// modelos/telefonosClientes.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql");
const Cliente = require("../client");

const ClientPhone = sequelize.define(
  "TelefonoCliente",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dni_cliente: {
      type: DataTypes.STRING(50),
      references: {
        model: Cliente,
        key: "dni",
      },
    },
    telefono: {
      type: DataTypes.STRING(20),
    },
  },
  {
    timestamps: false,
    tableName: "telefonos_clientes",
  }
);

module.exports = ClientPhone;
