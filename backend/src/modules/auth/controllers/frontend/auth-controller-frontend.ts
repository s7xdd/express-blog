import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";

import { ResponseHandler } from "../../../../shared/components/response-handler/response-handler";
import { comparePasswords, handleUserExistence } from "../../functions/auth-functions";
import { generateJwt } from "../../functions/jwt-functions";
import { createPayload } from "../../../../shared/utils/helper/common-functions";
import { userModule } from "../../../user/user-module";

export const frontendAuthController = {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username } = req.body;

      await handleUserExistence({ username, throwUserExistsError: true });

      const allowedFields = createPayload(req.body, ["username", "email", "bio"]);
      const hashedPassword = await bcrypt.hash(req.body?.password, 10);

      const newUser: any = await userModule.services.common.createUser({ ...allowedFields, password: hashedPassword });

      const userPayload = createPayload(newUser, ["_id", "username", "email", "bio", "avatar_url", "date_registered"]);

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

      const userPayload = createPayload(user, ["_id", "username", "email", "bio", "avatar_url", "date_registered"]);

      ResponseHandler.success({
        res,
        statusCode: 200,
        data: { ...userPayload, token },
        message: "Login successful",
      });
    } catch (error) {
      next(error);
    }
  },
};
