import express from "express";
import swaggerUi from "swagger-ui-express";

const swaggerFile = require("../swagger_output.json");
const server = express();

server.use(express.json());
server.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));
export default server;
