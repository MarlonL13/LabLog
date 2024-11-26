import sequelize from "../config/connection.js";
import { Model, DataTypes } from "sequelize";

class User extends Model {}

User.init(
  {
    id: {
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
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);

export default User;

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
};

syncDatabase();
