import Image from "../../models/imagesBanner";
import { AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY } from "../../config";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

export const createImageS3 = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "No image uploaded." });
    }

    const uploadParams = {
      Bucket: config.AWS_BUCKET_NAME,
      Key: "folder/" + Date.now() + "-" + image.originalname,
      Body: image.buffer,
      ContentType: image.mimetype,
    };

    const command = new PutObjectCommand(uploadParams);

    try {
      const data = await s3Client.send(command);
      res.json({
        message: "Imagen subida exitosamente.",
        imageUrl: data.Location,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error uploading image to S3." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir la imagen." });
  }
};


//-------------------------------------------------------------
//-------------------------------------------------------------

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
