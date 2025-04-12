import frontendUserRoutes from "./routes/frontend/user-routes-frontend";
import { userService } from "./services/common/user-service";


export const userModule = {
    routes: {
        frontend: frontendUserRoutes,
    },
    services: {
        common: userService,
    },
};