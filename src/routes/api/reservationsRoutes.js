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
import {
  createReservation,
  deleteReservation,
  getAllReservations,
  getReservationById,
  searchReservations,
} from "../../controllers/reservationController.js";

// ---------------------
// Authenticated Routes
// ---------------------

// Technician only routes
router.route("/search")
.get(searchReservations);

// Technician only routes
router.route("/:id")
.get(getReservationById)
.delete(deleteReservation);

router.route("/")
.get(getAllReservations) // Technician only route
.post(createReservation);

export default router;
