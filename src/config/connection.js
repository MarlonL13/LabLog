import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config({ path: "../../.env" }); 

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    define: {
      freezeTableName: true,
      timestamps: false,
      underscored: true,
    },
  }
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("Database connected!");
        
        // Create the extension for UUID generation
        await sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
        console.log("UUID extension enabled.");
    } catch (error) {
        console.error("Error connecting to the database or enabling UUID extension:", error);
    }
})();

export default sequelize;