import { Request, Response, NextFunction } from "express";

import { ResponseHandler } from "../../../../shared/components/response-handler/response-handler";
import { comparePasswords, handleUserExistence } from "../../functions/auth-functions";
import { UserService } from "../../../user/services/common/user-service";
import { generateJwt } from "../../functions/jwt-functions";
import { createPayload } from "../../../../shared/utils/helper/common-functions";

export const FrontendAuthController = {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, email, bio } = req.body;
      await handleUserExistence({ username, throwUserExistsError: true });

      const newUser: any = await UserService.createUser({ username, password, email, bio });

      const userPayload = createPayload(newUser, [
        "_id",
        "username",
        "email",
        "bio",
        "avatar_url",
        "date_registered",
      ]);

      ResponseHandler.success({
        res,
        statusCode: 201,
        message: "User registered successfully",
        data: userPayload,
      });
    } catch (error) {
      next(error);
    }
  },

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const { user }: { user: any } = await handleUserExistence({ username, throwNoUserExistsError: true });

      const isPasswordValid = await comparePasswords({
        plainPassword: password,
        hashedPassword: user!.password,
      });

      if (!isPasswordValid) {
        throw new Error("Invalid credentials");
      }

      const token = generateJwt(user);

      const userPayload = createPayload(user, [
        "_id",
        "username",
        "email",
        "bio",
        "avatar_url",
        "date_registered",
      ]);

      ResponseHandler.success({
        res,
        statusCode: 200,
        data: userPayload,
        message: "Login successful",
      });
    } catch (error) {
      next(error);
    }
  },
};
