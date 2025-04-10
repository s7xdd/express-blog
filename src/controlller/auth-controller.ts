import { Request, Response, NextFunction } from "express";

import { ResponseHandler } from "../components/response-handler/response-handler";
import { AuthService } from "../services/auth/auth-service";

export const AuthController = {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const newUser = await AuthService.register(username, password);

      ResponseHandler.success({
        res,
        statusCode: 201,
        data: { username: newUser.username },
        message: "User registered successfully",
      });
    } catch (error) {
      next(error);
    }
  },

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const { token, username: loggedInUsername } = await AuthService.login(username, password);

      ResponseHandler.success({
        res,
        statusCode: 200,
        data: {
          username: loggedInUsername,
          token,
        },
        message: "Login successful",
      });
    } catch (error) {
      next(error);
    }
  },
};
