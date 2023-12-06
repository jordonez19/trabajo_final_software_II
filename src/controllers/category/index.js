import Category from "../../models/category";

// Controlador para obtener todas las categorías
const getData = async (req, res) => {
  try {
    const categorias = await Category.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener una categoría por su ID
const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Category.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para crear una nueva categoría
const postData = async (req, res) => {
  const { name, description } = req.body;
  try {
    const nuevaCategoria = await Category.create({ name, description });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar una categoría existente
const updateDataById = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  try {
    const categoria = await Category.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    categoria.name = name;
    categoria.description = description;
    await categoria.save();
    res.json(categoria);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar una categoría existente
const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Category.findByPk(id);
    if (!categoria) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }
    await categoria.destroy();
    res.json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {getData, getDataById, postData, updateDataById, deleteById}