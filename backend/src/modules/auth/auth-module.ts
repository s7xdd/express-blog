import { ProtectedRouteMiddleware } from "../../shared/middlewares/auth/auth-middleware";
import adminAuthRouter from "./routes/admin/auth-routes-admin";
import frontendAuthRouter from "./routes/frontend/auth-routes-frontend";
import { AdminAuthService } from "./services/admin/auth/auth-service-admin";

export const AuthModule = {
    routes: {
        admin: adminAuthRouter,
        frontend: frontendAuthRouter,
    },
    services: {
        admin: AdminAuthService
    },
    middlewares: {
        ProtectedRouteMiddleware,
    },
};