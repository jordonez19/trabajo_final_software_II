const sequelize = require("../../database/mysql");

const getData = async (req, res) => {
  try {
    const productos = await sequelize.query("SELECT * FROM productos", {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postData = async (req, res) => {
  const { nombre, precio_actual, stock, id_proveedor, id_categoria } = req.body;
  try {
    const query = `
      INSERT INTO productos (nombre, precio_actual, stock, id_proveedor, id_categoria) 
      VALUES (:nombre, :precio_actual, :stock, :id_proveedor, :id_categoria)
    `;

    
    await sequelize.query(query, {
      replacements: {
        nombre,
        precio_actual,
        stock,
        id_proveedor,
        id_categoria,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json({ message: "Producto creado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM productos WHERE id_producto = :id";
    const product = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT,
    });

    if (product.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json(product[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDataById = async (req, res) => {
  const { id } = req.params;

  const { nombre, precio_actual, stock, id_proveedor, id_categoria } = req.body;
  try {
    const query = `
      UPDATE productos
      SET nombre = :nombre,
          precio_actual = :precio_actual,
          stock = :stock,
          id_proveedor = :id_proveedor,
          id_categoria = :id_categoria
      WHERE id_producto = :id
    `;

    const [updatedRows] = await sequelize.query(query, {
      replacements: {
        nombre,
        precio_actual,
        stock,
        id_proveedor,
        id_categoria,
        id,
      },
      type: sequelize.QueryTypes.UPDATE,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM productos WHERE id_producto = :id";
    const deletedRows = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.DELETE,
    });

    if (deletedRows === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getData, getDataById, postData, updateDataById, deleteById };
