import { Router } from "express";

import { ProtectedRouteMiddleware } from "../../../../shared/middlewares/auth/auth-middleware";
import { FrontendUserController } from "../../controllers/frontend/user-controller-frontend";

const frontendUserRouter = Router();

frontendUserRouter.get("/", ProtectedRouteMiddleware, FrontendUserController.getUserDetails);

export default frontendUserRouter;
