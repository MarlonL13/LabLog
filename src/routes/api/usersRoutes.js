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
import { verifyToken, checkRole } from "../../middleware/valdiateToken.js";
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
.get(verifyToken, searchUsers); // Search for users - optional accepts "role" query parameters

router
  .route("/:id")
  .get(verifyToken, checkRole("coordinator"), getUserById)
  .patch(verifyToken, checkRole("coordinator"), updateUser); // coordinator only route

// Coordinator only route
router.route("/").post(verifyToken, checkRole("coordinator"), createUser);

export default router;
