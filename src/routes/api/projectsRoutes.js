import express from "express";
const router = express.Router();
import { verifyToken, checkRole } from "../../middleware/valdiateToken.js";
import {
  createProject,
  getActiveProjects,
  getProjectById,
  searchProject,
  updateProject,
} from "../../controllers/projectController.js";

// Search endpoint
router.route("/search")
.get(verifyToken, searchProject);

// Project by ID endpoint - requires coordinator role to update
router.route("/:id")
.get(verifyToken, getProjectById)
.patch(verifyToken, checkRole("coordinator"), updateProject);

// Main project endpoint - requires coordinator role to create
router.route("/")
.get(verifyToken, getActiveProjects)
.post(verifyToken, checkRole("coordinator"), createProject);

export default router;
