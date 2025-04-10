import { Router } from "express";

import { BlogController } from "../../../controlller/front-end/blog/blog-controller";
import { validateData } from "../../../middlewares/common-middleware";
import { createBlogValidationSchema } from "../../../validators/blog/blog-validators";

const blogRouter = Router();

blogRouter.get("/", BlogController.getBlogs);
blogRouter.post("/create-blog", validateData(createBlogValidationSchema), BlogController.createBlog)

export default blogRouter;
