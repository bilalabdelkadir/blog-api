import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDatabase from "./config/databaseConfig.js";
import authRouter from "./routes/auth/authRoute.js";
import articleRouter from "./routes/article/articleRoute.js";
import expressRedisCache from "express-redis-cache";

// database connection
dotenv.config({ path: "./config/config.env" });
connectDatabase();

// config redis
const cache = expressRedisCache({
  expire: 10, // optional: expire every 10 seconds
  host: process.env.REDIS_URL,
  port: 6379,
});

// setting up the middleware
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// set up route
app.use("/api/v1", authRouter);
app.use("/api/v1/article", articleRouter);

const server = app.listen(process.env.PORT, () =>
  console.log(
    `server started at port ${process.env.PORT} in ${process.env.NODE_ENV}`
  )
);
