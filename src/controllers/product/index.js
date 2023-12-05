import Product from "../../models/product";

const getData = async (req, res) => {
  try {
    const productos = await Product.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postData = async (req, res) => {
  const { nombre, precio_actual, stock, id_proveedor, id_categoria } = req.body;
  try {
    const newProduct = await Product.create({
      nombre,
      precio_actual,
      stock,
      id_proveedor,
      id_categoria,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDataById = async (req, res) => {
  const { id } = req.params;

  const { nombre, precio_actual, stock, id_proveedor, id_categoria } = req.body;
  try {
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    await Product.update(
      { nombre,
        precio_actual,
        stock,
        id_proveedor,
        id_categoria
      },
      { where: { id_producto: id } }
    );

    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    await Product.destroy({ where: { id_producto: id } });
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getData, getDataById, postData, updateDataById, deleteById };
