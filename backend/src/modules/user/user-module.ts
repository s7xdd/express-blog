import frontendUserRouter from "./routes/frontend/user-routes-frontend";
import { userService } from "./services/common/user-service";


export const userModule = {
    routes: {
        frontend: frontendUserRouter,
    },
    services: {
        common: userService,
    },
};