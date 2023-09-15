import AWS from "aws-sdk";
import Image from "../../models/imagesBanner";

const s3 = new AWS.S3();

export const createImage = async (req, res) => {
  try {
    const { name, image } = req.body;
    const base64Data = image.toString("base64");

    // Configura los parámetros para subir la imagen a S3
    const params = {
      Bucket: "bucket-preguntepues",
      Key: `novakademia/${name}`, // Nombre de la imagen en S3
      Body: Buffer.from(base64Data, "base64"),
      ContentType: "image/jpeg", // Cambia según el tipo de imagen
    };

    // Sube la imagen a S3
    await s3.upload(params).promise();

    // Guarda los metadatos de la imagen en tu base de datos
    const newImage = new Image({
      name: name,
      imageUrl: `https://bucket-preguntepues.s3.amazonaws.com/novakademia/${name}`, // URL público de la imagen en S3
    });

    await newImage.save();

    res.json({ message: "Imagen subida exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir la imagen." });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Imagen no encontrada." });
    }

    // Elimina la imagen de S3
    const imageKey = `novakademia/${image.name}`;
    await s3
      .deleteObject({ Bucket: "bucket-preguntepues", Key: imageKey })
      .promise();

    // Elimina la entrada de la base de datos
    await image.remove();

    res.json({ message: "Imagen eliminada exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar la imagen." });
  }
};
