import { protectRouteMiddleware } from "./middleware/protected-route-middlware";
import passportRoutes from "./routes/passport-routes";

export const passportModule = {
    controller: {

    },

    routes: {
        v1: passportRoutes
    },

    middleware: {
        protectRouteMiddleware: protectRouteMiddleware
    }
}