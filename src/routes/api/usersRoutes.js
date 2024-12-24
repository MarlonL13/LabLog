import express from "express";
const router = express.Router();
import { verifyToken, checkRole } from "../../middleware/valdiateToken.js";
import {
  getUserById,
  createUser,
  updateUser,
  searchUsers,
} from "../../controllers/userController.js";


// Search endpoint 
router.route("/search")
.get(verifyToken, searchUsers);

// User by ID endpoints - requires coordinator role
router.route("/:id")
.get(verifyToken, checkRole("coordinator"), getUserById)
.patch(verifyToken, checkRole("coordinator"), updateUser);

// Create user endpoint - requires coordinator role
router.route("/")
.post(verifyToken, checkRole("coordinator"), createUser);

export default router;
