
import { Response, NextFunction } from "express";

import { ResponseHandler } from "../../../../shared/components/response-handler/response-handler";
import { createPayload } from "../../../../shared/utils/helper/common-functions";
import { adminAuthService } from "../../services/admin/auth/auth-service-admin";

export const adminAuthController = {
    
    async loginUser(req: any, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;

            const data: {
                user: any;
                token: string;
            } = await adminAuthService.login(username, password);

            const userPayload = createPayload(data?.user, ["_id", "username", "email", "bio", "is_admin", "avatar_url", "date_registered"]);

            ResponseHandler.success({
                res,
                statusCode: 200,
                data: { ...userPayload, token: data?.token },
                message: "Login successful",
            });
        } catch (error) {
            next(error);
        }
    },
};
