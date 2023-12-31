import express from "express";
import cors from "cors";
import env from "dotenv";
import cookieParser from "cookie-parser";
import colors from "colors";
import user from "./routes/user.js";
import photos from "./routes/photos.js";
import connectMongoDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import path from "path";
const __dirname = path.resolve();
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
app.use(express.static(path.join(__dirname, "api/public")));

// Api routes
app.use("/api/v1/user", user);
app.use("/api/v1/photos", photos);

// Error Handler
app.use(errorHandler);

// Running Server
app.listen(PORT, () => {
  connectMongoDB();
  console.log(`server is running on Port: ${PORT}`.bgGreen.white);
});
