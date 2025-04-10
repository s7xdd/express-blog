import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";

import { ResponseHandler } from "../components/response-handler/response-handler";
import { comparePasswords, handleUserExistence } from "../utils/helper/auth/auth-functions";
import { UserService } from "../services/user/user-service";
import { generateJwt } from "../utils/helper/jwt/jwt-functions";

export const AuthController = {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      await handleUserExistence({ username, throwUserExistsError: true, res });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await UserService.createUser({ username, password: hashedPassword });

      ResponseHandler.success({
        res,
        statusCode: 201,
        data: { username: newUser!.username },
        message: "User registered successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      await handleUserExistence({ username, throwNoUserExistsError: true, res });

      const user = await UserService.findUserByUsername({ username });

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
