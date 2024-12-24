import express from "express";
const router = express.Router();
import { login, logout, refreshAccessToken } from "../../controllers/authController.js";

// Login endpoint
router.route("/login")
.post(login);

// Refresh token endpoint
router.route("/refresh")
.post(refreshAccessToken);

// Logout endpoint
router.route("/logout")
.post(logout);

router.route("/forgot-password")
.post();

export default router;