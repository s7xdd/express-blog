import { protectedRouteMiddleware } from "../../shared/middlewares/auth/auth-middleware";
import adminAuthRouter from "./routes/admin/auth-routes-admin";
import frontendAuthRouter from "./routes/frontend/auth-routes-frontend";
import { adminAuthService } from "./services/admin/auth/auth-service-admin";

export const authModule = {
    routes: {
        admin: adminAuthRouter,
        frontend: frontendAuthRouter,
    },
    services: {
        admin: adminAuthService
    },
    middlewares: {
        common: protectedRouteMiddleware,
    },
};