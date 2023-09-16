import productsModel from "../../models/products";
import { awsS3 } from "../../config";

const { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY } =
  awsS3;

import {
  S3Client,
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

export const createProduct = async (req, res) => {
  try {
    console.log(req.body);

    //res.status(201).json(req.body);
    const { name, category, price, quantity, description, state } =
      req.body;

        // Subir la imagen a S3 y obtener la URL de la imagen
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

    let imageUrl;
    try {
      const data = await s3Client.send(command);
      imageUrl = data.Location;
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error uploading image to S3." });
    }
    const newProduct = new productsModel({
      name,
      category,
      price,
      image: imageUrl,
      quantity,
      description,
      state,
    });
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
  } catch (error) {
    console.error("createProduct =>> ", error);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productsModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("getProducts =>> ", error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsModel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    console.error("getProductById =>> ", error);
  }
};

export const updateProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productsModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (error) {
    console.error("updateProductById =>> ", error);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    await productsModel.findByIdAndDelete(id);
    res.json();
  } catch (error) {
    console.error("deleteProductById =>> ", error);
  }
};
