import express from "express";
import { AuthModule } from "../modules/auth/auth-module";
import { BlogModule } from "../modules/blog/blog-module";

const adminRoutes = express.Router();

adminRoutes.use('/auth', AuthModule.routes.admin);
adminRoutes.use('/blogs', BlogModule.routes.admin);

export default adminRoutes; 