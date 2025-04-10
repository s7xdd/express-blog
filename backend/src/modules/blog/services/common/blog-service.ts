import { handleMongooseErrors } from "../../../../shared/utils/helper/mongodb/mongo-functions";
import { BlogModel } from "../../models/blog-schema";
import { QueryRuleProps, UserProps } from "../../../../shared/utils/types/common-types";
import {
  buildQueryFromRules,
  createPayload,
  sanitizeArray,
  sluggify,
} from "../../../../shared/utils/helper/common-functions";
import { UserService } from "../../../user/services/common/user-service";
import { CategoryService } from "../../../category/services/common/category-service";

export const blogService = {
  async findBlogById({ _id }: { _id: string }) {
    try {
      const blog = await BlogModel.findOne({ _id });
      return blog;
    } catch (error) {
      handleMongooseErrors(error);
    }
  },

  async createBlog(blogData: any, userDetails: UserProps) {
    const allowedFields = createPayload(blogData, [
      "title",
      "content",
      "thumbnail_url",
    ]);

    let categorySlugsOrIds = sanitizeArray(blogData.categories);
    const tags = sanitizeArray(blogData.tags);

    const categoryObjectIds = await Promise.all(
      categorySlugsOrIds.map(async (cat) => {
        const category = await CategoryService.findCategory(cat);
        if (!category) {
          throw new Error(`Category not found for: ${cat}`);
        }
        return category._id;
      })
    );

    try {
      const blog = new BlogModel({
        slug: sluggify(blogData?.title),
        author_id: userDetails._id,
        ...allowedFields,
        categories: categoryObjectIds,
        tags,
      });

      await blog.save();
      await UserService.updateBlogCount({ _id: userDetails._id, addBlog: true });

      return blog;
    } catch (error) {
      handleMongooseErrors(error);
    }
  },

  async findBlogs(queryParams: any) {
    try {
      const queryRules: QueryRuleProps[] = [
        { key: "title", type: "regex" },
        { key: "author_id", type: "string" },
        { key: "categories", type: "array" },
        { key: "tags", type: "array" },
        { key: "is_published", type: "boolean" },
        { key: "keyword", type: "search" },
      ];

      const query = buildQueryFromRules(queryParams, queryRules);

      const limit = parseInt(queryParams.limit, 10) || 10;
      const page = parseInt(queryParams.page, 10) || 1;
      const skip = (page - 1) * limit;

      const blogs = await BlogModel.find(query)
        .sort({ date_published: -1 })
        .skip(skip)
        .limit(limit);

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
