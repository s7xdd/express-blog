import { Request, Response, NextFunction } from "express";

import { ResponseHandler } from "../../../shared/components/response-handler/response-handler";

export const otpMiddleware = {
    async requireVerifiedUser(req: any, res: Response, next: NextFunction) {
        const user = req.user;
        if (!user?.is_verified) {
            return ResponseHandler.error({
                res,
                statusCode: 403,
                message: "User must verify OTP to access this resource",
            });
        }
        next();
    }
};
