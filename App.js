import express from 'express';
import cors from "cors";
import hello from "./hello.js";
import Lab5 from './Lab5.js';
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
const app = express()
app.use(cors());
app.use(express.json());
hello(app);
Lab5(app);
ModuleRoutes(app);
CourseRoutes(app);
app.listen(process.env.PORT || 4000);