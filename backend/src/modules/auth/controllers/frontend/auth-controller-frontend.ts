import { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../../../../shared/components/response-handler/response-handler";
import { frontendAuthService } from "../../services/frontend/auth-service-frontend";

export const frontendAuthController = {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userPayload = await frontendAuthService.registerUser(req.body);

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
      const userWithToken = await frontendAuthService.loginUser(req.body);

      ResponseHandler.success({
        res,
        statusCode: 200,
        message: "Login successful",
        data: userWithToken,
      });
    } catch (error) {
      next(error);
    }
  },
};
