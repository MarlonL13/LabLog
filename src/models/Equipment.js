import sequelize from "../config/connection.js";
import { Model, DataTypes } from "sequelize";

class Equipment extends Model {}

User.init(
  {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    user_role: {
      type: DataTypes.ENUM(
        "student",
        "researcher",
        "technician",
        "coordinator"
      ),
      allowNull: false,
    },
    registration_number: {
      type: DataTypes.STRING(100),
      unique: true,
    },
    user_status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default Equipment;
