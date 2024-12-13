import { Product, Location, ProductSpec, Project } from "../models/index.js";
import { createRecord, updateRecord, deleteRecord } from "./commonServices.js";

const createSpec = async (body) => {
  return await createRecord(Product, body);
};

const updateSpec = async (productId, body) => {
  return await updateRecord(Product, productId, body);
};

const getProductById = async (productId) => {
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
  return productData;
};

const deleteProduct = async (productId) => {
  return await deleteRecord(Product, productId);
};

export const productServices = {
  createSpec,
  updateSpec,
  getProductById,
  deleteProduct,
};
