import express from "express";
import routes from "./src/routes/index.js";
import sequelize from "./src/config/connection.js";

const app = express();

app.use(express.json());

app.use("/", routes);

async function main() {
  await sequelize.sync({ force: false });
  app.listen(3000, () => {
    console.log("LabLog now listening on port 3000");
  });
}

main();
