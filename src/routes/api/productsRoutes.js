import express from "express";
const router = express.Router();
import { verifyToken, checkRole } from "../../middleware/valdiateToken.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
} from "../../controllers/productController.js";

router.route("/:id")
  .get(verifyToken, getProductById)
  .patch(verifyToken, updateProduct)
  .delete(verifyToken, checkRole("researcher"),deleteProduct); // Researcher and above only route

router.route("/")
.post(verifyToken, checkRole("technician"),createProduct); // Researcher and above only route

export default router;
