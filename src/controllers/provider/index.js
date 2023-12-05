// Obtener todos los usuarios

import Product from "../../models/product";


const getData = async (req, res) => {
  try {
    const productos = await Product.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crear un nuevo usuario
const postData = async (req, res) => {
  const { username, email } = req.body;
  try {
    const newUser = await Product.create({ username, email });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Obtener un usuario por ID
const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Product.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar un usuario por ID
const updateDataById = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  try {
    const user = await Product.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await Product.update({ username, email }, { where: { id } });
    res.json({ message: "Usuario actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un usuario por ID
const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Product.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await Product.destroy({ where: { id } });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
    getData, getDataById, postData, updateDataById, deleteById
};
