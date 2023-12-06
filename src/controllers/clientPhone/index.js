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
  const { telefono } = req.body;
  try {
    const telefonoCliente = await ClientPhone.findByPk(id);
    if (!telefonoCliente) {
      return res.status(404).json({ message: 'Teléfono del cliente no encontrado' });
    }
    telefonoCliente.telefono = telefono;
    await telefonoCliente.save();
    res.json(telefonoCliente);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

export { getData, getDataById, postData, updateDataById, deleteById };
