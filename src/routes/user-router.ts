import { Router } from "express";

import { ProtectedRouteMiddleware } from "../middlewares/auth-middleware";
import { UserController } from "../controlller/user-controller";

const userRouter = Router();

userRouter.get("/", ProtectedRouteMiddleware, UserController.getUserDetails);

export default userRouter;
