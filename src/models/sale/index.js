// modelos/ventas.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql");
const Cliente = require("./clientes");

const Sale = sequelize.define("Venta", {
  num_factura: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fecha: {
    type: DataTypes.DATE,
  },
  dni_cliente: {
    type: DataTypes.STRING(50),
    references: {
      model: Cliente,
      key: "dni",
    },
  },
  descuento: {
    type: DataTypes.DECIMAL(5, 2),
  },
  monto_final: {
    type: DataTypes.DECIMAL(10, 2),
  },
});

module.exports = Sale;
