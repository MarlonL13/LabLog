/*
Locations:
POST /locations
GET /locations/search?q=:query
DELETE /locations/:id
*/
import express from "express";
const router = express.Router();
import {
  createLocation,
  searchLocation,
  deleteLocation,
} from "../../controllers/locationController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/")
.post(createLocation); // Researcher and above only route

router.route("/:laboratory")
.get(searchLocation); // Researcher and above only route

router.route("/:id")
.delete(deleteLocation); // Researcher and above only route

export default router;
