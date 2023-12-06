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
      return res.status(404).json({ message: "Producto de venta no encontrado" });
    }

    res.json(saleProduct[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const postData = async (req, res) => {
  const { fecha, dni_cliente, descuento, monto_final } = req.body;
  try {
    const query = `
      INSERT INTO productos_venta (fecha, dni_cliente, descuento, monto_final) 
      VALUES (:fecha, :dni_cliente, :descuento, :monto_final)
    `;
    await sequelize.query(query, {
      replacements: {
        fecha,
        dni_cliente,
        descuento,
        monto_final,
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
  const { fecha, dni_cliente, descuento, monto_final } = req.body;

  try {
    const query = `
      UPDATE productos_venta
      SET fecha = :fecha,
          dni_cliente = :dni_cliente,
          descuento = :descuento,
          monto_final = :monto_final
      WHERE id = :id
    `;

    const [updatedRows] = await sequelize.query(query, {
      replacements: {
        fecha,
        dni_cliente,
        descuento,
        monto_final,
        id,
      },
      type: sequelize.QueryTypes.UPDATE,
    });

    if (updatedRows === 0) {
      return res.status(404).json({ message: "Producto de venta no encontrado" });
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
      return res.status(404).json({ message: "Producto de venta no encontrado" });
    }

    res.json({ message: "Producto de venta eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getData, getDataById, postData, updateDataById, deleteById };
