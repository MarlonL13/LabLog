import sequelize from "../config/connection.js";
import { Model, DataTypes } from "sequelize";

class Reservation extends Model {}

Reservation.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    equipment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "equipment",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    project_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "project",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    requester_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    operator: {
      type: DataTypes.ENUM("self", "technician"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    end_date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: "reservation",
  }
);

export default Reservation;
