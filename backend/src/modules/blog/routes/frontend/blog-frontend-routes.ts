import { Router } from "express";
import { frontendBlogController } from "../../controllers/frontend/blog-frontend-controller";


const blogFrontEndRouter = Router();

blogFrontEndRouter.get("/", frontendBlogController.getBlogs);

export default blogFrontEndRouter;
