import express from "express";
import cors from "cors";
import env from "dotenv";
import cookieParser from "cookie-parser";
import colors from "colors";
import user from "./routes/user.js";
import connectMongoDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
// Init
const app = express();
env.config();
const corsOptions = {
  origin: "http://localhost:3000", //included origin as true
  credentials: true, //included credentials as true
};
app.use(cors(corsOptions));

// Port
const PORT = process.env.PORT;

// Middlewares
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Api routes
app.use("/api/v1/user", user);

// Error Handler
app.use(errorHandler);

// Running Server
app.listen(PORT, () => {
  connectMongoDB();
  console.log(`server is running on Port: ${PORT}`.bgGreen.white);
});
