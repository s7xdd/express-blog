import { NextFunction } from "express";

import { ResponseHandler } from "../components/response-handler/response-handler";
import { UserService } from "../services/user/user-service";
import { getJWTUserDetails } from "../utils/helper/auth/auth-functions";

export const UserController = {
  async getUserDetails(req: any, res: any, next: NextFunction) {
    const tokenDetails = await getJWTUserDetails(req);

    const userDetails = tokenDetails && (await UserService.findUserById({ _id: tokenDetails._id }));

    try {
      return ResponseHandler.success({
        res,
        statusCode: 200,
        message: "User details fetched successfully",
        data: {
          username: userDetails,
        },
      });
    } catch (error) {}
  },
};
