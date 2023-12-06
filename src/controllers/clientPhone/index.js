import Client from '../../models/client'
import ClientPhone from '../../models/clientPhone'

const sequelize = require("../../database/mysql");

const getData = async (req, res) => {
  try {
    const query = "SELECT * FROM telefonos_clientes";
    const clients = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM telefonos_clientes WHERE id = :id";
    const clients = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT,
    });

    if (clients.length === 0) {
      return res
        .status(404)
        .json({ message: "Telefono cliente no encontrado" });
    }

    res.json(clients[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postData = async (req, res) => {
  const { dni_cliente, telefono } = req.body;
  try {
    const query = `
      INSERT INTO telefonos_clientes (dni_cliente, telefono)
      VALUES (:dni_cliente, :telefono);
      `;
    await sequelize.query(query, {
      replacements: {
        dni_cliente,
        telefono,
      },
      type: sequelize.QueryTypes.INSERT,
    });
    res.status(201).json({ message: "Telefono cliente creado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDataById = async (req, res) => {
  const { id } = req.params;

  const { dni_cliente, telefono } = req.body;

  try {
    const client = await ClientPhone.findByPk(id);
    console.log(client)
    if (!client) {
      return res
        .status(404)
        .json({ message: "telefono del cliente no encontrado" });
    }

    // Verificar si existen ventas asociadas al cliente
    const existingSales = await sequelize.models.Sale.findAll({
      where: { dni_cliente: id },
    });

    if (existingSales.length > 0) {
      return res.status(400).json({
        message:
          "No se puede actualizar: hay ventas asociadas a este telefono del cliente",
      });
    }

    const query = `
        UPDATE telefonos_clientes
        SET 
        dni_cliente = :dni_cliente,
        telefono = :telefono,
        WHERE id = :id
      `;

    const [updatedRows] = await sequelize.query(query, {
      replacements: {
        dni_cliente,
        telefono,
      },
      type: sequelize.QueryTypes.UPDATE,
    });

    if (updatedRows === 0) {
      return res
        .status(404)
        .json({ message: "telefono del cliente no encontrado" });
    }

    res.json({ message: "telefono del cliente actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await sequelize.models.Client.findByPk(id);
    if (!client) {
      return res
        .status(404)
        .json({ message: "telefono del cliente no encontrado" });
    }
    const query = "DELETE FROM telefonos_clientes WHERE id = :id";
    const deletedRows = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.DELETE,
    });

    if (deletedRows === 0) {
      return res
        .status(404)
        .json({ message: "telefono del cliente no encontrado" });
    }

    res.json({ message: "telefono del cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getData, getDataById, postData, updateDataById, deleteById };
