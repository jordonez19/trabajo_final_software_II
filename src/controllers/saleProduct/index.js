const sequelize = require("../../database/mysql");
import SaleProducts from "../../models/saleProduct";

const getData = async (req, res) => {
  try {
    const producto_ventas = await SaleProducts.findAll();
    res.json(producto_ventas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto_venta = await SaleProducts.findByPk(id);
    if (!producto_venta) {
      return res.status(404).json({ message: "producto_venta no encontrada" });
    }
    res.json(producto_venta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postData = async (req, res) => {
  const {
    id_producto_venta,
    id_producto,
    precio_producto_venta,
    cantidad_vendida,
    monto_total_producto,
  } = req.body;
  try {
    const nuevoProductoproducto_venta = await SaleProducts.create({
      id_producto_venta,
      id_producto,
      precio_producto_venta,
      cantidad_vendida,
      monto_total_producto,
    });
    res
      .status(201)
      .json(
        { message: "producto_venta creado correctamente" },
        nuevoProductoproducto_venta
      );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDataById = async (req, res) => {
  const { id } = req.params;
  const {
    id_producto_venta,
    id_producto,
    precio_producto_venta,
    cantidad_vendida,
    monto_total_producto,
  } = req.body;
  try {
    const sale_products = await SaleProducts.findByPk(id);
    if (!sale_products) {
      return res.status(404).json({
        message: "Registro de producto en producto_venta no encontrado",
      });
    }
    sale_products.id_producto_venta = id_producto_venta;
    sale_products.id_producto = id_producto;
    sale_products.precio_producto_venta = precio_producto_venta;
    sale_products.cantidad_vendida = cantidad_vendida;
    sale_products.monto_total_producto = monto_total_producto;
    await sale_products.save();
    res.json({ message: "producto_venta creado correctamente" }, sale_products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const producto_venta = await SaleProducts.findByPk(id);
    if (!producto_venta) {
      return res.status(404).json({ message: "producto_venta no encontrada" });
    }
    await producto_venta.destroy();
    res.json({ message: "producto_venta eliminada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getData, getDataById, postData, updateDataById, deleteById };
