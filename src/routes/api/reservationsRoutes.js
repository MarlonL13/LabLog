/*
Reservation:
POST /reservations
GET /reservations/:id
GET /reservations/active?page={page}&limit={limit}
GET /reservations/search?q=:query
DELETE /reservations/:id
 */

import express from "express";
const router = express.Router();
import {} from "../../controllers/reservationController.js";

// ---------------------
// Authenticated Routes
// ---------------------

router.route("/reservation")
.get() // Technician only route
.post();


// Technician only routes
router.route("/reservation/:id")
.get()
.delete();

// Technician only routes
router.route("/reservation/search")
.get();