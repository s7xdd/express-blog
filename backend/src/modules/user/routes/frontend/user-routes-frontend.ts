import { Router } from "express";

import { protectedRouteMiddleware } from "../../../../shared/middlewares/auth/auth-middleware";
import { frontendUserController } from "../../controllers/frontend/user-controller-frontend";

const frontendUserRoutes = Router();

frontendUserRoutes.get("/", protectedRouteMiddleware, frontendUserController.getUserDetails);

export default frontendUserRoutes;
