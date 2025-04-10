import { Router } from "express";
import blogRouter from "./front-end/blog/blog-routes";
import userRouter from "./front-end/user/user-router";
import authRouter from "./front-end/auth/auth-router";

const frontEndRoutes = Router();

frontEndRoutes.use("/blogs", blogRouter)
frontEndRoutes.use("/user-details", userRouter)
frontEndRoutes.use("/auth", authRouter)

export default frontEndRoutes;
