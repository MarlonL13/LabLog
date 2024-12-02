/*
Equipment:
GET /equipments/
GET /equipments/search?q=:query
POST /equipments
PATCH /equipments/:id
  */

import express from "express";
const router = express.Router();
import {} from "../../controllers/equipmentController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/equipments")
.post(); // technician and above only route

router.route("/equipments/search")
.get();

router.route("/equipments/:id")
.patch(); // technician and above only route

