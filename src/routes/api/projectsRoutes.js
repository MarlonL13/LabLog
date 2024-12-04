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
import {} from "../../controllers/projectController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/projects")
.get()
.post(); // Coordinator only route

router.route("/projects/:id")
.get()
.patch(); // Coordinator only route

router.route("/projects/search")
.get();

export default router;