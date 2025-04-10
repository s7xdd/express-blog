import express from "express";
import blogRouter from "./blog/blog-routes";

const adminRoutes = express.Router();

adminRoutes.use('/blog', blogRouter);

export default adminRoutes; 