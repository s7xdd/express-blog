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
        data: blogs.data,
        props: {
          total: blogs.totalcount,
          limit: blogs.limit,
          currentPage: Number(req.query.page || 1),
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
