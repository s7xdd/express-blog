import { Router } from "express";

import { BlogController } from "../../../controlller/front-end/blog/blog-controller";
import { validateData } from "../../../middlewares/common-middleware";
import { createBlogValidationSchema } from "../../../validators/blog/blog-validators";
import { ProtectedRouteMiddleware } from "../../../middlewares/auth/auth-middleware";
import { PERMISSION_BLOCKS } from "../../../utils/constants/admin/auth-constants";
import { PermissionMiddleware } from "../../../middlewares/admin/permission-middleware";

const blogRouter = Router();

blogRouter.use(ProtectedRouteMiddleware)
blogRouter.use(PermissionMiddleware({ requiredPermission: PERMISSION_BLOCKS.admin }));

blogRouter.get("/", BlogController.getBlogs);
blogRouter.post("/create-blog", validateData(createBlogValidationSchema), BlogController.createBlog)

export default blogRouter;
