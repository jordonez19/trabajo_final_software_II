// modelos/telefonosClientes.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql");
const Cliente = require("./clientes");

const ClientPhone = sequelize.define("TelefonoCliente", {
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
});

module.exports = ClientPhone;
