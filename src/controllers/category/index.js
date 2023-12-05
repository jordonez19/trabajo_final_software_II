
import Category from "../../models/category";

const getData = async (req, res) => {
  try {
    const categorias = await Category.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postData = async (req, res) => {
  const {nombre, descripcion } = req.body;
  try {
    const newCategory = await Category.create({
      nombre,
      descripcion,
    });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "categoria no encontrada" });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDataById = async (req, res) => {
  const { id } = req.params;

  const { nombre, precio_actual, stock, id_proveedor, id_categoria } = req.body;
  try {
    const category = await Category.findByPk(id);

    if (!category) {
      return res.status(404).json({ message: "categoria no encontrada" });
    }

    await Category.update(
      { nombre, precio_actual, stock, id_proveedor, id_categoria },
      { where: { id_categoria: id } }
    );

    res.json({ message: "categoria actualizada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      return res.status(404).json({ message: "categoria no encontrada" });
    }
    await Category.destroy({ where: { id_categoria: id } });
    res.json({ message: "categoria eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getData, getDataById, postData, updateDataById, deleteById };
