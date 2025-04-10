import { Router } from "express";

import { BlogController } from "../../controllers/frontend/blog-frontend-controller";
import { validateData } from "../../../../shared/middlewares/common-middleware";
import { createBlogValidationSchema } from "../../validators/blog-validators";
import { ProtectedRouteMiddleware } from "../../../../shared/middlewares/auth/auth-middleware";
import { PERMISSION_BLOCKS } from "../../../auth/constants/auth-constants";
import { PermissionMiddleware } from "../../../../shared/middlewares/auth/admin/permission-middleware-admin";

const blogAdminRouter = Router();

blogAdminRouter.use(ProtectedRouteMiddleware)
blogAdminRouter.use(PermissionMiddleware({ requiredPermission: PERMISSION_BLOCKS.admin }));

blogAdminRouter.get("/", BlogController.getBlogs);
blogAdminRouter.post("/create-blog", validateData(createBlogValidationSchema), BlogController.createBlog)

export default blogAdminRouter;
