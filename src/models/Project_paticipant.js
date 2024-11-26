import sequelize from "../config/connection.js";
import { Model, DataTypes } from "sequelize";

class ProjectParticipants extends Model {}

ProjectParticipants.init(
  {
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
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "user", 
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    is_coordinator: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "project_participants",
    indexes: [
      {
        unique: true,
        fields: ["project_id", "user_id"], // defining a composite key
      },
    ],
  }
);

export default ProjectParticipants;

const syncDatabase = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("Database synchronized");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
};

syncDatabase();
