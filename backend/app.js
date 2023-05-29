import express from "express";
import dotenv from "dotenv";
import "express-async-errors";

import error from "./middleware/error.js";
import path from "./middleware/path.js";
import courses from "./routes/course.js";
import users from "./routes/users.js";
import login from "./routes/login.js";
import connectDB from "./start/db.js";

/* Configuration */
const app = express();
dotenv.config();
connectDB();

/* Middleware */
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/v1/courses", courses);
app.use("/api/v1/users", users);
app.use("/api/v1/login", login);

app.use(error);
app.use(path);

/* Server */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Backend is running 🚀: 🌐http://localhost:${PORT}`)
);
