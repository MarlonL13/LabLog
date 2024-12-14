import { reservationServices } from "../services/reservationServices.js";

export const createReservation = async (req, res) => {
  try {
    const newReservation = await reservationServices.createReservation(
      req.body
    );
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await reservationServices.getAllReservations();
    if (reservations) {
      res.status(200).json(reservations);
    } else {
      res.status(404).json({ message: "No reservations found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const searchReservations = async (req, res) => {
  try {
    const reservations = await reservationServices.searchReservations(
      req.query.name
    );
    res.status(200).json(reservations);
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const getReservationById = async (req, res) => {
  try {
    const reservationData = await reservationServices.getReservationById(
      req.params.id
    );
    if (reservationData) {
      res.status(200).json(reservationData);
    } else {
      res.status(404).json({ message: "Reservation not found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const deleteReservation = async (req, res) => {
  try {
    await reservationServices.deleteReservation(req.params.id);
    res.status(200).json({ message: "Location deleted" });
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};
