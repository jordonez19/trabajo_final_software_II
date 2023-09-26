import { awsS3 } from "../../config";
import fs from "fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  S3Client,
  ListObjectsCommand,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY } = awsS3;

const s3Client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

// Subir imagen al bucket
export const uploadFile = async (req, res) => {
  try {
    const image = req.file;
    if (!image) {
      return res.status(400).json({ message: "No image uploaded." });
    }
    const uploadParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: Date.now() + "-" + image.originalname,
      Body: image.buffer,
      ContentType: image.mimetype,
    };

    try {
      const command = new PutObjectCommand(uploadParams);
      const result = await s3Client.send(command);
      return res.status(200).json({ result });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error uploading image to S3." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al subir la imagen." });
  }
};

// Obtener imagen del bucket
export const getFile = async (req, res) => {
  try {
    const params = req.params.etag;
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: params,
    });
    let result = await s3Client.send(command);
    const etag = result.ETag;
    result = result.$metadata;
    res.status(200).json({ etag: etag, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la imagen del bucket." });
  }
};

// Obtener imagen del bucket
export const downloadFile = async (req, res) => {
  try {
    const params = req.params.etag;
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: params,
    });
    let result = await s3Client.send(command);

    result = result.Body.pipe(fs.createWriteStream("./images/image.png"));

    res.status(200).json({ message: "file downloaded", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la imagen del bucket." });
  }
};

// Obtener todo lo del bucket
export const getFiles = async (req, res) => {
  try {
    const command = new ListObjectsCommand({
      Bucket: AWS_BUCKET_NAME,
    });
    let result = await s3Client.send(command);
    result = result.Contents;
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al cargar el bucket." });
  }
};

//get file url
export const getFileUrl = async (req, res) => {
  try {
    const params = req.params.etag;
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: params,
    });
    let result = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
    res.status(200).json({ url: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la imagen url." });
  }
};
