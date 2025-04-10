import express from "express";

import blogRouter from "./blog/blog-router";
import authRouter from "./auth/auth-router";


const adminRoutes = express.Router();

adminRoutes.use('/auth', authRouter);
adminRoutes.use('/blogs', blogRouter);

export default adminRoutes; 