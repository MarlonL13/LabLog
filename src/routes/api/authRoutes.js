/*
POST /login
POST /logout
POST /forgot-password
*/

import express from "express";
const router = express.Router();
import { login } from "../../controllers/authController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/login")
.post(login);

router.route("/verify")
.get()

router.route("/logout")
.post();

router.route("/forgot-password")
.post();

export default router;