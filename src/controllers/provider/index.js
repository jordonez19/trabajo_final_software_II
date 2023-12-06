// Obtener todos los usuarios

import Provider from "../../models/provider";

// Controlador para obtener todos los proveedores
const getData = async (req, res) => {
  try {
    const proveedores = await Provider.findAll();
    res.json(proveedores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para obtener un proveedor por su número de identificación (DNI)
const getDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const proveedor = await Provider.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para crear un nuevo proveedor
const postData = async (req, res) => {
  const { dni_provedor, nombre, direccion, telefono, pagina_web } = req.body;
  try {
    const nuevoProveedor = await Provider.create({ dni_provedor, nombre, direccion, telefono, pagina_web });
    res.status(201).json(nuevoProveedor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para actualizar un proveedor existente
const updateDataById = async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono, pagina_web } = req.body;
  try {
    const proveedor = await Provider.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    proveedor.nombre = nombre;
    proveedor.direccion = direccion;
    proveedor.telefono = telefono;
    proveedor.pagina_web = pagina_web;
    await proveedor.save();
    res.json(proveedor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controlador para eliminar un proveedor existente
const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const proveedor = await Provider.findByPk(id);
    if (!proveedor) {
      return res.status(404).json({ message: 'Proveedor no encontrado' });
    }
    await proveedor.destroy();
    res.json({ message: 'Proveedor eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getData, getDataById, postData, updateDataById, deleteById };
