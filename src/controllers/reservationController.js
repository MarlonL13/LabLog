import { Equipment, Project, Reservation, User } from "../models/index.js";
import { Op } from "sequelize";

export const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      attributes: {
        exclude: ["id", "project_id", "requester_id", "description"],
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
    if (reservations.length > 0) {
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
    const { name } = req.query;
    const reservations = await Equipment.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      attributes: {
        exclude: ["status"],
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
    if (reservations.length > 0) {
      res.status(200).json(reservations);
    } else {
      res.status(404).json({ message: "No reservations found" });
    }
  } catch (err) {
    res.status(500).json({ message: `${err.name}: ${err.message}` });
  }
};

export const getReservationById = async (req, res) => {
    try {
      const reservationId = req.params.id;
      const reservationData = await Reservation.findByPk(reservationId,
        {
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
                }
            ],
        }
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
  
  export const createResevation = async (req, res) => {
    try {
      const newReservation = await Reservation.create(req.body);
      res.status(201).json(newReservation);
    } catch (err) {
      res.status(500).json({ message: `${err.name}: ${err.message}` });
    }
  };
  
  export const deleteReservation = async (req, res) => {
    try {
      const { id } = req.params;
      const location = await Reservation.findByPk(id);
      await location.destroy();
  
      res.status(200).json({ message: "Reservation deleted" });
    } catch (err) {
      res.status(500).json({ message: `${err.name}: ${err.message}` });
    }
  };
  