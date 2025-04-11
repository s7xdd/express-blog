import { Router } from "express";

import { protectedRouteMiddleware } from "../../../../shared/middlewares/auth/auth-middleware";
import { frontendUserController } from "../../controllers/frontend/user-controller-frontend";

const frontendUserRouter = Router();

frontendUserRouter.get("/", protectedRouteMiddleware, frontendUserController.getUserDetails);

export default frontendUserRouter;
