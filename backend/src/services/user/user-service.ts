import { UserModel } from "../../models/user-schema";

export const UserService = {
  async getUserByUsername({ username }: { username: string }) {
    const user = await UserModel.findOne({ username });
    return user;
  },

  async getUserById({ _id }: { _id: string }) {
    const user = await UserModel.findById({ _id });
    return user;
  },
};
