import { Router } from "express";

import { BlogController } from "../../controllers/frontend/blog-frontend-controller";

const blogFrontEndRouter = Router();

blogFrontEndRouter.get("/", BlogController.getBlogs);

export default blogFrontEndRouter;
