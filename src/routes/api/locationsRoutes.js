import express from "express";
const router = express.Router();
import { verifyToken, checkRole } from "../../middleware/valdiateToken.js";
import {
  createLocation,
  searchLocation,
  deleteLocation,
} from "../../controllers/locationController.js";

// Create location endpoint - requires researcher role to create
router.route("/")
.post(verifyToken, checkRole("researcher"), createLocation);

// Search endpoint - requires a laboratory to search
router.route("/:laboratory")
.get(verifyToken, searchLocation);

// Delete location endpoint - requires researcher role to delete
router.route("/:id")
.delete(verifyToken, checkRole("researcher"), deleteLocation);

export default router;
