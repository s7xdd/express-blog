import { Router } from "express";
import { BlogModule } from "../modules/blog/blog-module";
import { UserModule } from "../modules/user/user-module";
import { AuthModule } from "../modules/auth/auth-module";


const frontEndRoutes = Router();

frontEndRoutes.use("/blogs", BlogModule.routes.frontend)
frontEndRoutes.use("/user-details", UserModule.routes.frontend)
frontEndRoutes.use("/auth", AuthModule.routes.frontend)

export default frontEndRoutes;
