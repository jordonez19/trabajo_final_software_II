// modelos/productosVenta.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql");
const Producto = require("../product");
const Venta = require("../sale");

const saleProduct = sequelize.define(
  "ProductoVenta",
  {
    id_producto_venta: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_venta: {
      type: DataTypes.INTEGER,
      references: {
        model: Venta,
        key: "num_factura",
      },
    },
    id_producto: {
      type: DataTypes.INTEGER,
      references: {
        model: Producto,
        key: "id_producto",
      },
    },
    precio_venta: {
      type: DataTypes.DECIMAL(10, 2),
    },
    cantidad_vendida: {
      type: DataTypes.INTEGER,
    },
    monto_total_producto: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    timestamps: false,
    tableName: "productos_venta",
  }
);
module.exports = saleProduct;
