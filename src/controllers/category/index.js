const sequelize = require("../../database/mysql");

const getData = async () => {
  try {
    const query = `
      SELECT * FROM categorias;
    `;
    const [categories, metadata] = await sequelize.query(query);
    return categories;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDataById = async (id) => {
  try {
    const query = `
      SELECT * FROM categorias WHERE id = :id;
    `;
    const [category, metadata] = await sequelize.query(query, {
      replacements: { id },
    });
    return category[0];
  } catch (error) {
    throw new Error(error.message);
  }
};

const postData = async (data) => {
  const { nombre, descripcion } = data;
  try {
    const query = `
      INSERT INTO categories (nombre, descripcion)
      VALUES (:nombre, :descripcion);
    `;
    await sequelize.query(query, {
      replacements: { nombre, descripcion },
    });
    return { message: "Category added successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateDataById = async (id, newData) => {
  try {
    const { nombre, descripcion } = newData;
    const query = `
      UPDATE categories
      SET nombre = :nombre, descripcion = :descripcion
      WHERE id = :id;
    `;
    await sequelize.query(query, {
      replacements: { id, nombre, descripcion },
    });
    return { message: "Category updated successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteById = async (id) => {
  try {
    const query = `
      DELETE FROM categorias
      WHERE id = :id;
    `;
    await sequelize.query(query, {
      replacements: { id },
    });
    return { message: "Category deleted successfully" };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { getData, getDataById, postData, updateDataById, deleteById };
