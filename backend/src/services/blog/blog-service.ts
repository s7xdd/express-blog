import * as bcrypt from "bcrypt";

import { handleMongooseErrors } from "../../utils/helper/mongodb/mongo-functions";
import { BlogModel } from "../../models/blog-schema";

export const BlogService = {
  async findBlogById({ _id }: { _id: string }) {
    try {
      const blog = await BlogModel.findOne({ _id });
      return blog;
    } catch (error) {
      handleMongooseErrors(error);
    }
  },

  async createBlog({
    blogDetails,
  }: {
    blogDetails: {
      title: string;
      content: string;
      categories: string[];
      tags: string[];
      thumbnail_url: string;
      author_id: string;
    };
  }) {
    try {
      const newBlog = new BlogModel(blogDetails);
      await newBlog.save();
      return newBlog;
    } catch (error) {
      handleMongooseErrors(error);
    }
  },

  async findBlogs(queryParams: any) {
    try {
      const query: any = {};

      if (queryParams.title) {
        query.title = { $regex: new RegExp(queryParams.title, "i") };
      }

      if (queryParams.author_id) {
        query.author_id = queryParams.author_id;
      }

      if (queryParams.categories) {
        query.categories = { $in: queryParams.categories.split(",") };
      }

      if (queryParams.tags) {
        query.tags = { $in: queryParams.tags.split(",") };
      }

      if (queryParams.is_published !== undefined) {
        query.is_published = queryParams.is_published === "true";
      }

      if (queryParams.keyword) {
        const keywordRegex = new RegExp(queryParams.keyword, "i");
        query.$or = [
          { title: keywordRegex },
          { content: keywordRegex },
          { tags: keywordRegex },
          { categories: keywordRegex },
        ];
      }

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
      throw error;
    }
  },
};
