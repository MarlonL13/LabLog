/*
Projects:
GET /projects/active?page={page}&limit={limit}
GET /projects/search?q={query}
GET /projects/:id
PATCH /projects/:id
POST /projects  
   */

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

// ---------------------
// Authenticated Routes
// ---------------------
router.route("/search")
.get(verifyToken, searchProject);

router
  .route("/:id")
  .get(verifyToken, getProjectById)
  .patch(verifyToken, checkRole("coordinator"), updateProject); // Coordinator only route

router
  .route("/")
  .get(verifyToken, getActiveProjects)
  .post(verifyToken, checkRole("coordinator"), createProject); // Coordinator only route

export default router;
