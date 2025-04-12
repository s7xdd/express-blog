import { protectedRouteMiddleware } from "../../shared/middlewares/auth/auth-middleware";
import adminAuthRoutes from "./routes/admin/auth-routes-admin";
import frontendAuthRoutes from "./routes/frontend/auth-routes-frontend";
import { adminAuthService } from "./services/admin/auth/auth-service-admin";

export const authModule = {
    routes: {
        admin: adminAuthRoutes,
        frontend: frontendAuthRoutes,
    },
    services: {
        admin: adminAuthService
    },
    middlewares: {
        common: protectedRouteMiddleware,
    },
};