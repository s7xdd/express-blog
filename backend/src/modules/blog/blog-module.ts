import { adminBlogController } from "./controllers/admin/blog-admin-controller";
import { frontendBlogController } from "./controllers/frontend/blog-frontend-controller";

import blogAdminRouter from "./routes/admin/blog-admin-routes";
import blogFrontEndRouter from "./routes/frontend/blog-frontend-routes";

import { blogService } from "./services/common/blog-service";

export const blogModule = {
  routes: {
    admin: blogAdminRouter,
    frontend: blogFrontEndRouter,
  },
  controllers: {
    frontend: frontendBlogController,
    admin: adminBlogController,
  },
  services: {
    common: blogService,
  },
};
