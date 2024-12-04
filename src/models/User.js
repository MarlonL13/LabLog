import sequelize from "../config/connection.js";
import { Model, DataTypes } from "sequelize";

class User extends Model {}

User.init(
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    phone: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    role: {
      type: DataTypes.ENUM(
        "student",
        "researcher",
        "technician",
        "coordinator"
      ),
      allowNull: false,
    },
    registration_number: {
      type: DataTypes.STRING(20),
      unique: true,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
    defaultScope: {
      attributes: { exclude: ["password","registration_number"] }, // Exclude password by default
    },
  }
);
export default User;
