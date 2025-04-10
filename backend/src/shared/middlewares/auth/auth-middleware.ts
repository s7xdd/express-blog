import jwt from "jsonwebtoken";
import { ResponseHandler } from "../../components/response-handler/response-handler";
import { UserService } from "../../../modules/user/services/common/user-service";
import { createPayload } from "../../utils/helper/common-functions";

const ProtectedRouteMiddleware = async (req: any, res: any, next: any) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token)
    return ResponseHandler.error({
      res,
      statusCode: 403,
      message: "Unauthorized",
    });

  if (!process.env.JWT_KEY) {
    return ResponseHandler.error({
      res,
      statusCode: 500,
      message: "JWT Error",
    });
  }

  jwt.verify(token, process.env.JWT_KEY!, { ignoreExpiration: false }, async (err: any, decoded: any) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return ResponseHandler.error({
          res,
          statusCode: 401,
          message: "Token expired",
        });
      }
      return ResponseHandler.error({
        res,
        statusCode: 403,
        message: "Unauthorized",
      });
    }

    const user = decoded && (await UserService.findUserById({ _id: decoded?._id }));

    const userDetails = createPayload(user, ["_id", "username", "email", "bio", "avatar_url", "date_registered", "is_admin", "password"]);

    req.userDetails = userDetails
    next();
  });
};

export { ProtectedRouteMiddleware };
