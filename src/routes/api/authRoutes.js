/*
POST /login
POST /logout
POST /forgot-password
*/

import express from "express";
const router = express.Router();
import { login, logout, refreshAccessToken } from "../../controllers/authController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/login")
.post(login);

router.route("/refresh")
.post(refreshAccessToken);

router.route("/logout")
.post(logout);

router.route("/forgot-password")
.post();

export default router;