import Client from "../../models/client";
import Sale from "../../models/sale";

const getData = async (req, res) => {
  try {
    const clients = await Client.findAll();
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
    const newCategory = await Client.create({
      dni,
      nombre,
      direccion_calle,
      direccion_numero,
      direccion_comuna,
      direccion_ciudad,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: "cliente no encontrada" });
    }
    res.json(client);
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
    const client = await Client.findByPk(id);

    if (!client) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    // Verificar si existen ventas asociadas al cliente
    const existingSales = await Sale.findAll({ where: { dni_cliente: id } });

    if (existingSales.length > 0) {
      return res
        .status(400)
        .json({
          message:
            "No se puede actualizar: hay ventas asociadas a este cliente",
        });
    }

    await Client.update(
      {
        dni,
        nombre,
        direccion_calle,
        direccion_numero,
        direccion_comuna,
        direccion_ciudad,
      },
      { where: { dni: id } }
    );

    res.json({ message: "Cliente actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const client = await Client.findByPk(id);
    if (!client) {
      return res.status(404).json({ message: "cliente no encontrada" });
    }
    await Client.destroy({ where: { id_client: id } });
    res.json({ message: "cliente eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getData, getDataById, postData, updateDataById, deleteById };
