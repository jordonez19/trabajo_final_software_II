import productsModel from "../../models/products";

export const getProducts = async (req, res) => {
  try {
    const products = await productsModel.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("getProducts =>> ", error);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category, price, imgUrl } = req.body;
    const newProduct = new productsModel({ name, category, price, imgUrl });
    const productSaved = await newProduct.save();
    res.status(201).json(productSaved);
  } catch (error) {
    console.error("createProduct =>> ", error);
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
