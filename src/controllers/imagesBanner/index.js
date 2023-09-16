import Image from "../../models/imagesBanner";
import { awsS3 } from "../../config";

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY } =
  awsS3;

import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

//post image folder
export const createImageS3 = async (req, res) => {
  try {
    const image = req.file;

    if (!image) {
      return res.status(400).json({ message: "No image uploaded." });
    }

    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
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



export const getAllImages = async (req, res) => {
  try {
    const listParams = {
      Bucket: AWS_BUCKET_NAME,
    };

    const listCommand = new ListObjectsCommand(listParams);

    try {
      const listData = await s3Client.send(listCommand);
      const imageKeys = listData.Contents.map((object) => object.Key);

      const images = [];

      for (const key of imageKeys) {
        const getParams = {
          Bucket: AWS_BUCKET_NAME,
          Key: key,
        };

        const getCommand = new GetObjectCommand(getParams);
        const getData = await s3Client.send(getCommand);

        const image = {
          key: key,
          data: getData.Body.toString("base64"),
        };

        images.push(image);
      }

      res.json({ images });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error retrieving images from S3." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las imágenes." });
  }
};