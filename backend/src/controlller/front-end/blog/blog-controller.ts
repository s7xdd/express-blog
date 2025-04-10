import { NextFunction } from "express";

import { ResponseHandler } from "../../../components/response-handler/response-handler";
import { BlogService } from "../../../services/blog/blog-service";

export const BlogController = {
  async getBlogs(req: any, res: any, next: NextFunction) {
    try {
      const blogs = await BlogService.findBlogs(req.query);

      return ResponseHandler.success({
        res,
        statusCode: 200,
        message: "Blogs fetched successfully",
        props: {
          total: blogs?.totalcount,
          limit: blogs?.limit,
          currentPage: Number(req.query.page || 1),
        },
        data: blogs?.data,
      });
    } catch (error) {
      next(error);
    }
  },

  async createBlog(req: any, res: any, next: NextFunction) {
    try {
      const blog = await BlogService.createBlog(req.body);

      return ResponseHandler.success({
        res,
        statusCode: 200,
        message: "Blogs fetched successfully",
        data: blog,
      });

    } catch (error) {
      next(error);
    }
  }

};
