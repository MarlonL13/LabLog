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
import { verifyToken, checkRole } from "../../middleware/valdiateToken.js";
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
.get(verifyToken, checkRole("technician"), searchReservations);

// Technician only routes
router.route("/:id")
.get(verifyToken, checkRole("technician"), getReservationById)
.delete(verifyToken, checkRole("technician"), deleteReservation);

router.route("/")
.get(verifyToken,checkRole("technician") , getAllReservations) // Technician only route
.post(verifyToken, createReservation);

export default router;
