import { Router } from "express";
import { BlogController } from "../../../controlller/front-end/blog/blog-controller";

const blogRouter = Router();

blogRouter.get("/", BlogController.getBlogs);

export default blogRouter;
