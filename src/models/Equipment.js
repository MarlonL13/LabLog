import sequelize from "../config/connection.js";
import { Model, DataTypes } from "sequelize";

class Equipment extends Model {}

Equipment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("available", "maintenance", "broken"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "equipment",
  }
);

export default Equipment;
