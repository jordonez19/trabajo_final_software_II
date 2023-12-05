// modelos/productos.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql");
const Proveedor = require("../provider");
const Category = require("../category");

const Product = sequelize.define(
  "Producto",
  {
    id_producto: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id_producto",
    },
    nombre: {
      type: DataTypes.STRING(100),
    },
    precio_actual: {
      type: DataTypes.DECIMAL(10, 2),
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    id_proveedor: {
      type: DataTypes.STRING(50),
      references: {
        model: Proveedor,
        key: "dni",
      },
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      references: {
        model: Category,
        key: "id_categoria",
      },
    },
  },
  {
    timestamps: false,
    tableName: "productos",
  }
);

module.exports = Product;

