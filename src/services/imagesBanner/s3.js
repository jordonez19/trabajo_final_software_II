import AWS from "aws-sdk";
import Image from "../../models/imagesBanner";

const s3 = new AWS.S3();

export const createImage = async (req, res) => {
  try {
    const { name, image } = req.body;
    const base64Data = image.toString("base64");

    // Configura los parámetros para subir la imagen a S3
    const params = {
      Bucket: "bucket-preguntepues", // Reemplaza con el nombre de tu bucket en S3
      Key: `novakademia/${name}`, // Cambia la ruta de destino en S3 según tu estructura
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





