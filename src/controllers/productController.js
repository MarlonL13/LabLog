import { productServices } from "../services/productServices.js";

export const createProduct = async (req, res) => {
  try {
    const newProduct = await productServices.createSpec(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const update = await productServices.updateSpec(req.params.id, req.body);
    if (update) {
      res.status(200).json({ message: "Product updated" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productData = await productServices.getProductById(req.params.id);
    if (productData) {
      res.status(200).json(productData);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await productServices.deleteProduct(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};
