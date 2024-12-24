import express from "express";
const router = express.Router();
import { verifyToken, checkRole } from "../../middleware/valdiateToken.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../controllers/productController.js";

// Product by ID endpoint - requires researcher role to delete
router.route("/:id")
  .get(verifyToken, getProductById)
  .patch(verifyToken, updateProduct)
  .delete(verifyToken, checkRole("researcher"), deleteProduct);

// Main product endpoint - requires technician role to create
router.route("/")
.post(verifyToken, checkRole("researcher"), createProduct);

export default router;
