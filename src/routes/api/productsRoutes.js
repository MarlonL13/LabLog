import express from "express";
const router = express.Router();
import { createProduct, deleteProduct, getProductById, updateProduct } from "../../controllers/productController.js";

router.route("/:id")
.get(getProductById)
.patch(updateProduct)
.delete(deleteProduct); // Researcher and above only route

router.route("/")
.post(createProduct); // Researcher and above only route

export default router;