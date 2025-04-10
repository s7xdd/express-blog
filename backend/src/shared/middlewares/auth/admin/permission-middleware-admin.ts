import { ResponseHandler } from "../../../components/response-handler/response-handler";
import { checkPermissionBlock } from "../../../../modules/auth/functions/auth-functions";

export const PermissionMiddleware = ({ requiredPermission }: { requiredPermission: string }) => (req: any, res: any, next: any) => {
    const userDetails = req.userDetails;
    if (checkPermissionBlock({ userDetails, requiredPermission })) {
        next();
    } else {
        return ResponseHandler.error({
            res,
            message: "Unauthorized",
            statusCode: 403,

        })
    }
};

