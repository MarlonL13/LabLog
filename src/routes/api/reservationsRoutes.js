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


// Search endpoint - requires technician role
router.route("/search")
.get(verifyToken, checkRole("technician"), searchReservations);

// Reservation by ID endpoints - requires technician role
router.route("/:id")
.get(verifyToken, checkRole("technician"), getReservationById)
.delete(verifyToken, checkRole("technician"), deleteReservation);

// Main reservation endpoints - get requires technician role
router.route("/")
.get(verifyToken, checkRole("technician"), getAllReservations)
.post(verifyToken, createReservation);

export default router;
