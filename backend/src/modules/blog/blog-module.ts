import { frontendBlogController } from "./controllers/frontend/blog-frontend-controller";
import blogAdminRouter from "./routes/admin/blog-admin-routes";
import blogFrontEndRouter from "./routes/frontend/blog-frontend-routes";
import { blogService } from "./services/common/blog-service";

export const BlogModule = {
  routes: {
    admin: blogAdminRouter,
    frontend: blogFrontEndRouter,
  },
  controllers: {
    frontendController: frontendBlogController
  },
  services: {
    blogService: blogService,
  },
};