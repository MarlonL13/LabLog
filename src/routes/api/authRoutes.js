/*
POST /login
POST /logout
POST /forgot-password
*/

import express from "express";
const router = express.Router();
import {} from "../../controllers/authController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/login")
.post();

router.route("/logout")
.post();

router.route("/forgot-password")
.post();

export default router;