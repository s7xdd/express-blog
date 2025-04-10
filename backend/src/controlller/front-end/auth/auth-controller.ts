import { Request, Response, NextFunction } from "express";

import { ResponseHandler } from "../../../components/response-handler/response-handler";
import { comparePasswords, handleUserExistence } from "../../../utils/helper/auth/auth-functions";
import { UserService } from "../../../services/user/user-service";
import { generateJwt } from "../../../utils/helper/jwt/jwt-functions";

export const AuthController = {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, email, bio } = req.body;
      await handleUserExistence({ username, throwUserExistsError: true });

      const newUser = await UserService.createUser({ username, password, email, bio });

      ResponseHandler.success({
        res,
        statusCode: 201,
        message: "User registered successfully",
        data: {
          _id: newUser?._id,
          username: newUser?.username,
          email: newUser?.email,
          bio: newUser?.bio,
          date_registered: newUser?.date_registered,
          avatar_url: newUser?.avatar_url,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const { user } = await handleUserExistence({ username, throwNoUserExistsError: true });

      const isPasswordValid = await comparePasswords({
        plainPassword: password,
        hashedPassword: user!.password,
      });

      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      const token = generateJwt(user!);

      ResponseHandler.success({
        res,
        statusCode: 200,
        data: {
          username: user!.username,
          token,
        },
        message: "Login successful",
      });
    } catch (error) {
      next(error);
    }
  },
};
