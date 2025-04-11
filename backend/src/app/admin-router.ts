import express from "express";
import { authModule } from "../modules/auth/auth-module";
import { blogModule } from "../modules/blog/blog-module";

const adminRoutes = express.Router();

adminRoutes.use('/auth', authModule.routes.admin);
adminRoutes.use('/blogs', blogModule.routes.admin);

export default adminRoutes; 