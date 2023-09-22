import { awsS3 } from "../../config";
import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY } =
  awsS3;

const s3Client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

// Subir imagen al bucket
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

      console.log(data);

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

// Retrieve an object by ETag
export const getImageByETag = async (req, res) => {
  try {
    const objectKey = "folder/1695356711111-betester.png"; // Replace with the object key you want to retrieve
    const eTagToCheck = "36dac711239ff411b20857a547ffbce0";
    const getParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: objectKey,
      IfNoneMatch: eTagToCheck,
    };

    const getCommand = new GetObjectCommand(getParams);
    console.log("getCommand", getCommand);
    try {
      const response = await s3Client.send(getCommand);
      console.log("response", response);

      // Check for a 304 (Not Modified) response.
      if (response.$metadata.httpStatusCode === 304) {
        return res.status(304).json({ message: "Object has not changed." });
      }

      // If the ETag does not match, you can access the object's content.
      const objectData = await response.Body.read();

      // Set the appropriate Content-Type header for the response.
      res.setHeader("Content-Type", response.ContentType);

      // Send the object data in the response.
      res.send(objectData);
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Error retrieving image from S3." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la imagen." });
  }
};
