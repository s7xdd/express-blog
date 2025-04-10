import * as bcrypt from "bcrypt";
import { UserModel } from "../../models/user-schema";
import { comparePasswords, handleUserExistence } from "../../utils/helper/auth/auth-functions";
import { generateJwt } from "../../utils/helper/jwt/jwt-functions";
import mongoose from "mongoose";
import { handleMongooseErrors } from "../../utils/helper/mongodb/mongo-functions";

export const AuthService = {
  async register(username: string, password: string): Promise<any> {
    try {
      await handleUserExistence({ username, throwUserExistsError: true });
      const hashedPassword = await bcrypt.hash(password, process.env.BCRYPT_SALT!);
      const newUser = new UserModel({ username, password: hashedPassword });
      await newUser.save();
      return newUser;
    } catch (error: any) {
      handleMongooseErrors(error);
    }
  },

  async login(username: string, password: string): Promise<{ token: string; username: string }> {
    const { user } = await handleUserExistence({ username, throwNoUserExistsError: true });

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
