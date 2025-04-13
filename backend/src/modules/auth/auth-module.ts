import adminAuthRoutes from "./routes/admin/auth-routes-admin";
import frontendAuthRoutes from "./routes/frontend/auth-routes-frontend";
import { adminAuthService } from "./services/admin/auth-service-admin";
import { userService } from "./services/user/user-service";
import { protectedRouteMiddleware } from "./middleware/common/protected-route-middleware";
import { permissionMiddleware } from "./middleware/common/permission-middleware-admin";

export const authModule = {
    routes: {
        admin: adminAuthRoutes,
        frontend: frontendAuthRoutes,

    },

    services: {
        admin: adminAuthService,
        user: userService,
    },

    middlewares: {
        protectedroute: protectedRouteMiddleware,
        permission: permissionMiddleware
    },
};