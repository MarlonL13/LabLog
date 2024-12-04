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
import {
  getUserById,
  createUser,
  updateUser,
  searchUsers,
} from "../../controllers/userController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/search")
.get(searchUsers); // Search for users - optional accepts "role" query parameters

router.route("/:id")
.get(getUserById)
.patch(updateUser); // coordinator only route

// Coordinator only route
router.route("/")
.post(createUser);

export default router;
