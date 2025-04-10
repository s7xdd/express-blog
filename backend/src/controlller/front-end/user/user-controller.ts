import { NextFunction } from "express";

import { ResponseHandler } from "../../../components/response-handler/response-handler";

export const UserController = {
  async getUserDetails(req: any, res: any, next: NextFunction) {

    try {
      return ResponseHandler.success({
        res,
        statusCode: 200,
        message: "User details fetched successfully",
        data: req.userDetails,
      });
    } catch (error) { }
  },
};
