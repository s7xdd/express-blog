
import { Response, NextFunction } from "express";

import { ResponseHandler } from "../../../components/response-handler/response-handler";
import { createPayload } from "../../../utils/helper/common-functions";
import { AuthService } from "../../../services/backend/auth-service";

export const AuthController = {
    
    async loginUser(req: any, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;

            const data: {
                user: any;
                token: string;
            } = await AuthService.login(username, password);

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
