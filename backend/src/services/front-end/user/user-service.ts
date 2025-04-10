import { UserModel } from "../../../models/user-schema";
import { handleMongooseErrors } from "../../../utils/helper/mongodb/mongo-functions";

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

  async createUser({ username, password }: { username: string; password: string }) {
    try {
      const newUser = new UserModel({ username, password });
      await newUser.save();
      return newUser;
    } catch (error) {
      handleMongooseErrors(error);
    }
  },
};
