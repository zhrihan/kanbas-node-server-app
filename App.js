import "dotenv/config";
import express from 'express';
import mongoose from "mongoose";
import helloApp from './Hello.js';
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from './Kanbas/assignments/routes.js';
import UserRoutes from "./Kanbas/Users/routes.js";
import session from "express-session";
const CONNECTION_STRING =  process.env.DB_CONNECTION_STRING ||  'mongodb://localhost:27017/kanbas';
mongoose.connect(CONNECTION_STRING);
const app = express();
app.use(cors({
  credentials: true,
  origin: 'https://a6--hilarious-phoenix-11b533.netlify.app'
  // origin: 'http://localhost:3000'
}
));
app.use(express.json());
const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
        sameSite: 'none',
        secure: true,
        domain: "https://kanbas-node-server-app-1-akxn.onrender.com"
    }
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    proxy: true,
    cookie: {
      sameSite: "none",
      secure: true,
        domain: "https://kanbas-node-server-app-1-akxn.onrender.com",
    },
  })
);

AssignmentRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
Lab5(app);
helloApp(app);
UserRoutes(app);
app.get("/health_check", (req, res) => {
  res.json({ message: "Welcome to the Kanbas API" });
}
);

app.listen(4000);