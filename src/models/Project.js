import sequelize from "../config/connection.js";
import { Model, DataTypes } from "sequelize";

class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    coordinator_id: {
      type: DataTypes.UUID,
      references: {
        model: "user",
        key: "id",
      },
      onDelete: "RESTRICT",
      onUpdate: "CASCADE",
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "project",
  }
);

export default Project;

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
};

syncDatabase();
