import { Router } from "express";

import { blogModule } from "../modules/blog/blog-module";
import { userModule } from "../modules/user/user-module";
import { authModule } from "../modules/auth/auth-module";
import { categoryModule } from "../modules/category/category-module";

const frontEndRouter = Router();

//BLOG ROUTES
frontEndRouter.use("/auth", authModule.routes.frontend);
frontEndRouter.use("/user-details", userModule.routes.frontend);
frontEndRouter.use("/blogs", blogModule.routes.frontend);
frontEndRouter.use("/categories", categoryModule.routes.frontend);


export default frontEndRouter;
