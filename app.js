import express from "express";
import routes from "./src/routes/index.js";
import sequelize from "./src/config/connection.js";
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger-output.js'

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument)); // Swagger UI endpoint

app.use("/", routes);

async function main() {
  await sequelize.sync({ force: false });
  app.listen(3000, () => {
    console.log("LabLog now listening on port 3000");
  });
}

main();
