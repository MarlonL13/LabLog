import express from "express";
const router = express.Router();
import {} from "../../controllers/productController.js";

router.route("/")
.post(); // Researcher and above only route

router.route("/:id")
.get()
.patch()
.delete();

export default router;