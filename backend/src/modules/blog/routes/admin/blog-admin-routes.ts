import { Router } from "express";

import { validateData } from "../../../../shared/middlewares/common-middleware";
import { createBlogValidationSchema } from "../../validators/blog-validators";
import { protectedRouteMiddleware } from "../../../../shared/middlewares/auth/auth-middleware";
import { PERMISSION_BLOCKS } from "../../../auth/constants/auth-constants";
import { PermissionMiddleware } from "../../../../shared/middlewares/auth/admin/permission-middleware-admin";
import { adminBlogController } from "../../controllers/backend/blog-admin-controller";
import { imageUploadModule } from "../../../image-upload/image-upload-module";

const blogImageFields = [
  { name: "thumbnail", maxCount: 1 },
  { name: "blogimage", maxCount: 1 },
];

const blogAdminRouter = Router();

blogAdminRouter.use(protectedRouteMiddleware);
blogAdminRouter.use(PermissionMiddleware({ requiredPermission: PERMISSION_BLOCKS.admin }));

blogAdminRouter.get("/", adminBlogController.getBlogs);

blogAdminRouter.post(
  "/create-blog",
  imageUploadModule.middleware.uploadMiddleware(blogImageFields, "public/uploads/blog-uploads"),
  validateData(createBlogValidationSchema),
  adminBlogController.createBlog
);

export default blogAdminRouter;
