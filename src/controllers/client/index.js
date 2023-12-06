const sequelize = require("../../database/mysql");

const getData = async (req, res) => {
  try {
    const query = "SELECT * FROM clientes";
    const clients = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postData = async (req, res) => {
  const {
    dni,
    nombre,
    direccion_calle,
    direccion_numero,
    direccion_comuna,
    direccion_ciudad,
  } = req.body;
  try {
    const query = `
      INSERT INTO clients (dni, nombre, direccion_calle, direccion_numero, direccion_comuna, direccion_ciudad)
      VALUES (:dni, :nombre, :direccion_calle, :direccion_numero, :direccion_comuna, :direccion_ciudad)
    `;
    await sequelize.query(query, {
      replacements: {
        dni,
        nombre,
        direccion_calle,
        direccion_numero,
        direccion_comuna,
        direccion_ciudad,
      },
      type: sequelize.QueryTypes.INSERT,
    });
    res.status(201).json({ message: "Cliente creado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM clientes WHERE id_client = :id";
    const clients = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT,
    });

    if (clients.length === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json(clients[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDataById = async (req, res) => {
  const { id } = req.params;

  const {
    dni,
    nombre,
    direccion_calle,
    direccion_numero,
    direccion_comuna,
    direccion_ciudad,
  } = req.body;

  try {
    const client = await sequelize.models.Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Verificar si existen ventas asociadas al cliente
    const existingSales = await sequelize.models.Sale.findAll({
      where: { dni_cliente: id },
    });

    if (existingSales.length > 0) {
      return res.status(400).json({
        message: "No se puede actualizar: hay ventas asociadas a este cliente",
      });
    }

    const query = `
      UPDATE clients
      SET dni = :dni,
          nombre = :nombre,
          direccion_calle = :direccion_calle,
          direccion_numero = :direccion_numero,
          direccion_comuna = :direccion_comuna,
          direccion_ciudad = :direccion_ciudad
      WHERE id_client = :id
    `;

    const [updatedRows] = await sequelize.query(query, {
      replacements: {
        dni,
        nombre,
        direccion_calle,
        direccion_numero,
        direccion_comuna,
        direccion_ciudad,
        id,
      },
      type: sequelize.QueryTypes.UPDATE,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json({ message: "Cliente actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await sequelize.models.Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }
    const query = "DELETE FROM clientes WHERE id_client = :id";
    const deletedRows = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.DELETE,
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json({ message: "Cliente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export { getData, getDataById, postData, updateDataById, deleteById };
