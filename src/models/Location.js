import sequelize from "../config/connection.js";
import { Model, DataTypes } from "sequelize";

class Location extends Model {}

Location.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    laboratory: {
      type: DataTypes.ENUM("lab1", "lab2"),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "location",
  }
);

export default Location;
