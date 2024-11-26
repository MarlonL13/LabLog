import sequelize from "../config/connection.js";
import { Model, DataTypes } from "sequelize";

class Location extends Model {}

Location.init(
  {
    locationId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    labId: {
      type: DataTypes.ENUM("lab1", "lab2" /* ... other lab options */),
      allowNull: false,
    },
    locationDescription: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Location",
    tableName: "locations",
  }
);

module.exports = Location;
