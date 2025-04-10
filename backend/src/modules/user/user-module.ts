import frontendUserRouter from "./routes/frontend/user-routes-frontend";
import { UserService } from "./services/common/user-service";


export const UserModule = {
    routes: {
        admin: "",
        frontend: frontendUserRouter,
    },
    services: {
        userService: UserService,
    },
};