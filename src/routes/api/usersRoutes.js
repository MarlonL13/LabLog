/*
Users:
GET /users/:id
GET /users/search?q=:query
GET /users/search?q=:query&role=coordinator
POST /users
PATCH /users/:id
*/

import express from "express";
const router = express.Router();
import {} from "../../controllers/usersController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/users/:id")
.get()
.patch(); // coordinator only route

router.route("/users/search")
.get() // Search for users - optional accepts "role" query parameters

// Coordinator only route
router.route("/users")
.post();