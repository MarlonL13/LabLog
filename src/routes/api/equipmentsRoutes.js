/*
Equipment:
GET /equipments/
GET /equipments/search?q=:query
POST /equipments
PATCH /equipments/:id
  */

import express from "express";
const router = express.Router();
import { verifyToken, checkRole } from "../../middleware/valdiateToken.js";
import {
  createEquipment,
  getAllEquipment,
  updateEquipment,
} from "../../controllers/equipmentController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/:id")
.patch(verifyToken, checkRole("technician"), updateEquipment); // technician and above only route

router.route("/")
.get(verifyToken, getAllEquipment) // technician and above only route
.post(verifyToken, checkRole("technician"), createEquipment); // technician and above only route

export default router;
