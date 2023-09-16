import Image from "../../models/imagesBanner";

export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las imágenes." });
  }
};

export const getImageById = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Imagen no encontrada." });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la imagen." });
  }
};

export const createImage = async (req, res) => {
  try {
    const { name, image } = req.body;
    const base64Data = image.toString("base64");
    const newImage = new Image({
      name: name,
      image: base64Data,
    });
    await newImage.save();
    res.json({ message: "Imagen subida exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al subir la imagen." });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Imagen no encontrada." });
    }
    await image.remove();
    res.json({ message: "Imagen eliminada exitosamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la imagen." });
  }
};
