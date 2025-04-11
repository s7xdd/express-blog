import { Router } from "express";

import { validateData } from "../../../../shared/middlewares/common-middleware";
import { createBlogValidationSchema } from "../../validators/blog-validators";
import { protectedRouteMiddleware } from "../../../../shared/middlewares/auth/auth-middleware";
import { PERMISSION_BLOCKS } from "../../../auth/constants/auth-constants";
import { PermissionMiddleware } from "../../../../shared/middlewares/auth/admin/permission-middleware-admin";
import { adminBlogController } from "../../controllers/backend/blog-admin-controller";

const blogAdminRouter = Router();

blogAdminRouter.use(protectedRouteMiddleware);
blogAdminRouter.use(PermissionMiddleware({ requiredPermission: PERMISSION_BLOCKS.admin }));

blogAdminRouter.get("/", adminBlogController.getBlogs);
blogAdminRouter.post("/create-blog", validateData(createBlogValidationSchema), adminBlogController.createBlog);

export default blogAdminRouter;
