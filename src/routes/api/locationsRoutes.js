/*
Locations:
POST /locations
GET /locations/search?q=:query
DELETE /locations/:id
*/
import express from "express";
const router = express.Router();
import { verifyToken, checkRole } from "../../middleware/valdiateToken.js";
import {
  createLocation,
  searchLocation,
  deleteLocation,
} from "../../controllers/locationController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/")
.post(verifyToken, checkRole("researcher"), createLocation); // Researcher and above only route

router.route("/:laboratory")
.get(verifyToken, searchLocation);

router.route("/:id")
.delete(verifyToken, checkRole("researcher"), deleteLocation); // Researcher and above only route

export default router;
