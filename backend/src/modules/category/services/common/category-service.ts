import mongoose from "mongoose";
import { sluggify } from "../../../../shared/utils/helper/common-functions";
import { handleMongooseErrors } from "../../../../shared/utils/helper/mongodb/mongo-functions";
import { CategoryModel } from "../../models/category-schema";

export const categoryService = {
    async createCategory(categoryData: { category_title: string }) {
        try {
            const slug = sluggify(categoryData.category_title);

            const existing = await CategoryModel.findOne({ slug });
            if (existing) {
                throw new Error("Category with this title already exists.");
            }

            const category = new CategoryModel({
                category_title: categoryData.category_title.trim(),
                slug,
            });

            return await category.save();
        } catch (error) {
            handleMongooseErrors(error);
        }
    },

    async findCategory(identifier: string) {
        try {
            const query = mongoose.Types.ObjectId.isValid(identifier)
                ? { _id: identifier }
                : { slug: identifier.toLowerCase() };

            return await CategoryModel.findOne(query);
        } catch (error) {
            handleMongooseErrors(error);
        }
    },

    async getAllCategories() {
        try {
            return await CategoryModel.find().sort({ category_title: 1 });
        } catch (error) {
            handleMongooseErrors(error);
        }
    },
};
