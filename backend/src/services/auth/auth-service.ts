import * as bcrypt from "bcrypt";

import { UserModel } from "../../models/user-schema";
import { comparePasswords, handleUserExistence } from "../../utils/helper/auth/auth-functions";
import { generateJwt } from "../../utils/helper/jwt/jwt-functions";
import { handleMongooseErrors } from "../../utils/helper/mongodb/mongo-functions";

export const AuthService = {
  async register(username: string, password: string, res: any): Promise<any> {
    try {
      const user = await handleUserExistence({ username, throwUserExistsError: true, res });
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new UserModel({ username, password: hashedPassword });
      await newUser.save();
      return newUser;
    } catch (error: any) {
      handleMongooseErrors(error);
    }
  },

  async login(username: string, password: string, res: any): Promise<{ token: string; username: string }> {
    const { user } = await handleUserExistence({ username, throwNoUserExistsError: true, res });

    const passwordValid = await comparePasswords({
      plainPassword: password,
      hashedPassword: user!.password,
    });

    if (!passwordValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateJwt(user!);

    return { token, username: user!.username };
  },
};
