import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDatabase from "./config/databaseConfig.js";
import authRouter from "./routes/auth/authRoute.js";
import articleRouter from "./routes/article/articleRoute.js";

// database connection
dotenv.config({ path: "./config/config.env" });
connectDatabase();

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
