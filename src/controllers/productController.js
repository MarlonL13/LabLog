import { Product, Location, ProductSpec, Project } from "../models/index.js";

export const createProduct = async (req, res) => {
    try {
      const newProduct = await Product.create(req.body);
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(500).json({ message: `${err.name}: ${err.message}` });
    }
  };

export const updateProduct = async (req, res) => {
    try {
      const productId = req.params.id;
      const [update] = await Product.update(req.body, { where: { id: productId } });
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
    const productId = req.params.id;
    const productData = await Product.findByPk(productId, {
      attributes: [
        "status",
        "condition",
        "expiration_date",
        "current_amount",
        "date_received",
      ],
      include: [
        {
          model: Location,
          as: "location",
          attributes: ["laboratory", "sub_location"],
        },
        {
          model: ProductSpec,
          as: "product_spec",
          attributes: ["name"],
        },
        {
            model: Project,
            as: "project",
            required: false,
            attributes: ["name"],
        },
      ],
    });
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
      const productId  = req.params.id;
      const product = await Product.findByPk(productId);
      await product.destroy();
      res.status(200).json({ message: "Product deleted" });
    } catch (err) {
      res.status(500).json({ message: `${err.name}: ${err.message}` });
    }
  };