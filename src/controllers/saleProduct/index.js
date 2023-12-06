const sequelize = require("../../database/mysql");

const getData = async (req, res) => {
  try {
    const query = "SELECT * FROM productos_venta";
    const saleProducts = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });
    res.json(saleProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "SELECT * FROM productos_venta WHERE id = :id";
    const saleProduct = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.SELECT,
    });

    if (saleProduct.length === 0) {
      return res
        .status(404)
        .json({ message: "Producto de venta no encontrado" });
    }

    res.json(saleProduct[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postData = async (req, res) => {
  const {
    id_venta,
    id_producto,
    precio_venta,
    cantidad_vendida,
    monto_total_producto,
  } = req.body;
  try {
    const query = `
      INSERT INTO productos_venta (id_venta, id_producto, precio_venta, cantidad_vendida, monto_total_producto) 
      VALUES (:id_venta, :id_producto, :precio_venta, :cantidad_vendida, :monto_total_producto)
    `;
    await sequelize.query(query, {
      replacements: {
        id_venta,
        id_producto,
        precio_venta,
        cantidad_vendida,
        monto_total_producto,
      },
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json({ message: "Producto de venta creado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateDataById = async (req, res) => {
  const { id } = req.params;
  const {
    id_venta,
    id_producto,
    precio_venta,
    cantidad_vendida,
    monto_total_producto,
  } = req.body;

  try {
    const query = `
        UPDATE productos_venta
        SET id_venta = :id_venta,
            id_producto = :id_producto,
            precio_venta = :precio_venta,
            cantidad_vendida = :cantidad_vendida,
            monto_total_producto = :monto_total_producto
        WHERE id = :id
      `;

    const [updatedRows] = await sequelize.query(query, {
      replacements: {
        id_venta,
        id_producto,
        precio_venta,
        cantidad_vendida,
        monto_total_producto,
        id,
      },
      type: sequelize.QueryTypes.UPDATE,
    });

    if (updatedRows === 0) {
      return res
        .status(404)
        .json({ message: "Producto de venta no encontrado" });
    }

    res.json({ message: "Producto de venta actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "DELETE FROM productos_venta WHERE id = :id";
    const deletedRows = await sequelize.query(query, {
      replacements: { id },
      type: sequelize.QueryTypes.DELETE,
    });

    if (deletedRows === 0) {
      return res
        .status(404)
        .json({ message: "Producto de venta no encontrado" });
    }

    res.json({ message: "Producto de venta eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getData, getDataById, postData, updateDataById, deleteById };
