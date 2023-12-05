// modelos/productosVenta.js
const { DataTypes } = require("sequelize");
const sequelize = require("../../database/mysql");
const Producto = require("./productos");
const Venta = require("./ventas");

const saleProduct = sequelize.define("ProductoVenta", {
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
});

module.exports = saleProduct;