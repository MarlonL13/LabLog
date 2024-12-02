import { sequelize } from "../models/index.js";

// Script for creatring the database

(async () => {
  try {
    await sequelize.sync({ force: false });
    console.log("DB created sucessfully");
  } catch (error) {
    console.error("DB creation failed", error);
  }
})();
