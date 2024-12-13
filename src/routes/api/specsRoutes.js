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
import { createSpec, getSpectById, searchSpec, updateSpec } from "../../controllers/specController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/search")
.get(searchSpec);

router.route("/:id")
.get(getSpectById)
.patch(updateSpec); // Researcher and above only route

router.route("/")
.post(createSpec); // Researcher and above only route

export default router;