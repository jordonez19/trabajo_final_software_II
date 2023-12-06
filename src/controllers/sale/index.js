const sequelize = require("../../database/mysql");
import Sale from "../../models/sale";

const getData = async (req, res) => {
  try {
    const ventas = await Sale.findAll();
    res.json(ventas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const venta = await Sale.findByPk(id);
    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    res.json(venta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const postData = async (req, res) => {
  const { fecha, dni_cliente, descuento, monto_final } = req.body;
  try {
    const nuevaVenta = await Sale.create({ fecha, dni_cliente, descuento, monto_final });
    res.status(201).json(nuevaVenta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDataById = async (req, res) => {
  const { id } = req.params;
  const { fecha, dni_cliente, descuento, monto_final } = req.body;
  try {
    const venta = await Sale.findByPk(id);
    if (!venta) {
      return res.status(404).json({ message: 'Sale no encontrada' });
    }
    venta.fecha = fecha;
    venta.dni_cliente = dni_cliente;
    venta.descuento = descuento;
    venta.monto_final = monto_final;
    await venta.save();
    res.json(venta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const venta = await Sale.findByPk(id);
    if (!venta) {
      return res.status(404).json({ message: 'Venta no encontrada' });
    }
    await venta.destroy();
    res.json({ message: 'Venta eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getData, getDataById, postData, updateDataById, deleteById };
