import dotenv from "dotenv";
import { Sequelize } from "sequelize";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

// Resolve the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Dynamically resolve the path to your .env file
const envPath = resolve(__dirname, "../../.env");
dotenv.config({ path: envPath });

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

// function used to connect to the db
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the database");
    // Create the extension for UUID generation
    // await sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
    // console.log("UUID extension enabled.");
  } catch (error) {
    console.error(
      "Error connecting to the database or enabling UUID extension:",
      error
    );
  }
})();

export default sequelize;
