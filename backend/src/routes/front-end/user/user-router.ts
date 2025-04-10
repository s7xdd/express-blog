import { Router } from "express";

import { ProtectedRouteMiddleware } from "../../../middlewares/auth/auth-middleware";
import { UserController } from "../../../controlller/front-end/user/user-controller";

const userRouter = Router();

userRouter.get("/", ProtectedRouteMiddleware, UserController.getUserDetails);

export default userRouter;
