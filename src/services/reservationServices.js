import { Equipment, Project, Reservation, User } from "../models/index.js";
import { createRecord, deleteRecord } from "./commonServices.js";
import { Op } from "sequelize";

const getAllReservations = async () => {
  const reservations = await Reservation.findAll({
    attributes: {
      exclude: ["equipment_id", "project_id", "requester_id", "description"],
    },
    include: [
      {
        model: Equipment,
        as: "equipment",
        attributes: ["name"],
      },
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
    ],
  });
  return reservations;
};

const searchReservations = async (query) => {
  const reservations = await Equipment.findAll({
    where: {
      name: {
        [Op.iLike]: `%${query}%`,
      },
    },
    attributes: {
      exclude: ["id", "status"],
    },
    include: [
      {
        model: Reservation,
        as: "reservations",
        attributes: ["id", "operator", "start_date", "end_date"],
        include: [
          {
            model: User,
            as: "user",
            attributes: ["name"],
          },
        ],
      },
    ],
  });
  return reservations;
};

const getReservationById = async (reservationId) => {
  const reservationData = await Reservation.findByPk(reservationId, {
    attributes: {
      exclude: ["id", "project_id", "requester_id", "equipment_id"],
    },
    include: [
      {
        model: Equipment,
        as: "equipment",
        attributes: ["name"],
      },
      {
        model: User,
        as: "user",
        attributes: ["name"],
      },
      {
        model: Project,
        as: "project",
        attributes: ["name"],
      },
    ],
  });
  return reservationData;
};

const createReservation = async (body) => {
  return await createRecord(Reservation, body);
};

const deleteReservation = async (modelId) => {
  return await deleteRecord(Reservation, modelId);
};

export const reservationServices = {
  getAllReservations,
  searchReservations,
  getReservationById,
  createReservation,
  deleteReservation,
};
