/*
Equipment:
GET /equipments/
GET /equipments/search?q=:query
POST /equipments
PATCH /equipments/:id
  */

import express from "express";
const router = express.Router();
import {
  createEquipment,
  getAllEquipment,
  updateEquipment,
} from "../../controllers/equipmentController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/:id")
.patch(updateEquipment); // technician and above only route

router.route("/")
.get(getAllEquipment) // technician and above only route
.post(createEquipment); // technician and above only route

export default router;
