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
.get(searchProject);

router.route("/:id")
.get(getProjectById)
.patch(updateProject); // Coordinator only route

router.route("/").
get(getActiveProjects)
.post(createProject); // Coordinator only route

export default router;