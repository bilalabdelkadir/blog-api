import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDatabase from "./config/databaseConfig.js";
import authRouter from "./routes/auth/authRoute.js";
import articleRouter from "./routes/article/articleRoute.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// database connection
dotenv.config({ path: "./config/config.env" });
connectDatabase();

// config redis
// const cache = expressRedisCache({
//   expire: 10, // optional: expire every 10 seconds
//   host: process.env.REDIS_URL,
//   port: 6379,
// });

// setting up the middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// set up route
app.use("/api/v1", authRouter);
app.use("/api/v1", articleRouter);

const PORT = parseInt(process.env.PORT) || 8000;
const NODE_ENV = process.env.NODE_ENV || "Development Mode";

// Swagger configuration
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "blog app api",
      version: "1.0.0",
      description: "My Blog app api",
      contact: {
        name: "Bilal Abdelkadir",
        email: "bilalbinabdelkadir@gmail.com",
      },
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

const server = app.listen(PORT, () =>
  console.log(`server started at port ${process.env.PORT} in ${NODE_ENV}`)
);
