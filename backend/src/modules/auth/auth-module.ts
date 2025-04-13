import adminAuthRoutes from "./routes/admin/auth-routes-admin";
import frontendAuthRoutes from "./routes/frontend/auth-routes-frontend";
import { userService } from "./services/user/user-service";
import { protectedRouteMiddleware } from "./middleware/common/protected-route-middleware";
import { permissionMiddleware } from "./middleware/common/permission-middleware-admin";
import { otpServices } from "./services/otp/otp-services";

export const authModule = {
    routes: {
        admin: adminAuthRoutes,
        frontend: frontendAuthRoutes,
    },

    services: {
        user: userService,
        otp: otpServices,
    },

    middlewares: {
        protectedroute: protectedRouteMiddleware,
        permission: permissionMiddleware
    },
};