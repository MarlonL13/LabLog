/*
Products:
GET /spec/search?q=:query
GET /spec/:id
GET /spec/:id/products/:id
PATCH /spec/:id
PATCH /spec/:id/products/:id
POST /spec
POST /spec/:id/products
DELETE /spec/:id/product/:id
  */

import express from "express";
const router = express.Router();
import { getSpectById, searchSpec } from "../../controllers/specController.js";

// ---------------------
// Authenticated Routes
// ---------------------
router.route("/:id")
.get(getSpectById)
.patch(); // Researcher and above only route

router.route("/")
.post(); // Researcher and above only route

router.route("/search")
.get(searchSpec);

export default router;