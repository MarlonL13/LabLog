import express from "express";
const router = express.Router();
import { verifyToken, checkRole } from "../../middleware/valdiateToken.js";
import {
  createSpec,
  getSpectById,
  searchSpec,
  updateSpec,
} from "../../controllers/specController.js";

// Search endpoint
router.route("/search")
.get(verifyToken, searchSpec);

// Spec by Id endpoint - requires researcher role to update
router.route("/:id")
.get(verifyToken, getSpectById)
.patch(verifyToken, checkRole("researcher"), updateSpec);

// Create spect endpoint - requires researcher role
router.route("/")
.post(verifyToken, checkRole("researcher"), createSpec);

export default router;
