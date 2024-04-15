// const express= require('express');
import "dotenv/config";
import express from "express";
import morgan from "morgan";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import UserRoutes from "./Kanbas/Users/routes.js";
import cors from "cors";
import session from "express-session";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/kanbas'
mongoose.connect(CONNECTION_STRING);

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

const sessionOptions = {
  secret: "keyboardcat",
  resave: false,
  saveUninitialized: true,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(express.json());
app.use(session(sessionOptions));

app.get("/", (_, res) => {
  res.send({ status: "ok" });
});

ModuleRoutes(app);
CourseRoutes(app);
AssignmentRoutes(app);
Lab5(app);
Hello(app);
UserRoutes(app);

const PORT = process.env.PORT || 4000;

app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}`);
});