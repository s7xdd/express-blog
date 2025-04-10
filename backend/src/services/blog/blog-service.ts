import * as bcrypt from "bcrypt";

import { handleMongooseErrors } from "../../utils/helper/mongodb/mongo-functions";
import { BlogModel } from "../../models/blog-schema";
import { QueryRuleProps } from "../../utils/types/common-types";
import { buildQueryFromRules } from "../../utils/helper/common-functions";
import { NextFunction } from "express";

export const BlogService = {
  async findBlogById({ _id }: { _id: string }) {
    try {
      const blog = await BlogModel.findOne({ _id });
      return blog;
    } catch (error) {
      handleMongooseErrors(error);
    }
  },

  async createBlog(blogData: any) {
    try {
      const blog = new BlogModel({
        ...blogData,
      });

      return await blog.save();
    } catch (error) {
      handleMongooseErrors(error);
    }
  },

  async findBlogs(queryParams: any) {
    try {

      const queryRules: QueryRuleProps[] = [
        { key: 'title', type: 'regex' },
        { key: 'author_id', type: 'string' },
        { key: 'categories', type: 'array' },
        { key: 'tags', type: 'array' },
        { key: 'is_published', type: 'boolean' },
        { key: 'keyword', type: 'search' },
      ];

      const query = buildQueryFromRules(queryParams, queryRules);

      const limit = parseInt(queryParams.limit, 10) || 10;
      const page = parseInt(queryParams.page, 10) || 1;
      const skip = (page - 1) * limit;

      const blogs = await BlogModel.find(query).sort({ date_published: -1 }).skip(skip).limit(limit);

      const totalBlogs = await BlogModel.countDocuments(query);

      return {
        totalcount: totalBlogs,
        limit,
        data: {
          blogs,
        },
      };
    } catch (error) {
      handleMongooseErrors(error);
    }
  },
};
