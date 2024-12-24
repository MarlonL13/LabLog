import express from "express";
const router = express.Router();
import { verifyToken, checkRole } from "../../middleware/valdiateToken.js";
import {
  createEquipment,
  getAllEquipment,
  updateEquipment,
} from "../../controllers/equipmentController.js";

// Equipment by ID endpoint - requires technician role to update
router.route("/:id")
.patch(verifyToken, checkRole("technician"), updateEquipment); // technician and above only route

// Main equipment endpoint - requires technician role to create
router.route("/")
.get(verifyToken, getAllEquipment)
.post(verifyToken, checkRole("technician"), createEquipment);

export default router;
