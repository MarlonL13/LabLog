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
import {} from "../../controllers/productController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/spec")
.post(); // Researcher and above only route

router.route("/spec/search")
.get();

router.route("/spec/:id")
.get()
.patch(); // Researcher and above only route

router.route("/spec/:id/products")
.post(); // Researcher and above only route

router.route("/spec/:id/products/:id")
.get()
.patch()
.delete();


