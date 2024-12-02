/*
Locations:
POST /locations
GET /locations/search?q=:query
DELETE /locations/:id
*/
import express from "express";
const router = express.Router();
import {} from "../../controllers/productController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/locations")
.post(); // Researcher and above only route

router.route("/locations/search")	
.get(); // Researcher and above only route

router.route("/locations/:id")
.delete(); // Researcher and above only route

