import * as bcrypt from "bcrypt";

import { UserModel } from "../../models/user-schema";
import { handleMongooseErrors } from "../../../../shared/utils/helper/mongodb/mongo-functions";

export const UserService = {
  async findUserByUsername({ username }: { username: string }) {
    try {
      const user = await UserModel.findOne({ username });
      return user;
    } catch (error) {
      handleMongooseErrors(error);
    }
  },

  async findUserById({ _id }: { _id: string }) {
    try {
      const user = await UserModel.findById({ _id });
      return user;
    } catch (error) {
      handleMongooseErrors(error);
    }
  },

  async createUser({
    username,
    password,
    email,
    bio,
  }: {
    username: string;
    password: string;
    email: string;
    bio: string;
  }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({ username, password: hashedPassword, email, bio });
      await newUser.save();
      return newUser;
    } catch (error) {
      handleMongooseErrors(error);
    }
  },

  async updateBlogCount({ _id, addBlog = true }: { _id: string, addBlog?: boolean }) {
    try {
      const user: any = await this.findUserById({ _id });
      const newBlogCount = Math.max((addBlog ? user.total_blogs + 1 : user.total_blogs - 1), 0);

      await user.updateOne({ total_blogs: newBlogCount })
    } catch (error) {
      handleMongooseErrors(error);
    }
  }
};
