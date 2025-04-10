import { NextFunction } from "express";

import { ResponseHandler } from "../../../components/response-handler/response-handler";
import { createPayload } from "../../../utils/helper/common-functions";

export const UserController = {
  async getUserDetails(req: any, res: any, next: NextFunction) {

    const userPayload = createPayload(req.userDetails, ["_id", "username", "email", "bio", "avatar_url", "date_registered"]);

    try {
      return ResponseHandler.success({
        res,
        statusCode: 200,
        message: "User details fetched successfully",
        data: userPayload,
      });
    } catch (error) {
      next(error);
    }
  },

};
