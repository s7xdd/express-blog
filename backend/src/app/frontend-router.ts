import { Router } from "express";
import { blogModule } from "../modules/blog/blog-module";
import { userModule } from "../modules/user/user-module";
import { authModule } from "../modules/auth/auth-module";

const frontEndRoutes = Router();

frontEndRoutes.use("/auth", authModule.routes.frontend);
frontEndRoutes.use("/user-details", userModule.routes.frontend);
frontEndRoutes.use("/blogs", blogModule.routes.frontend);

export default frontEndRoutes;
