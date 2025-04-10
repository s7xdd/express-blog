import jwt from "jsonwebtoken";
import { ResponseHandler } from "../../components/response-handler/response-handler";
import { UserService } from "../../services/user/user-service";

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

    const userDetails = {
      username: user?.username,
      email: user?.email,
      bio: user?.bio,
      avatar_url: user?.avatar_url,
      date_registered: user?.date_registered,
      token: user?.token,
    }

    req.userDetails = userDetails
    next();
  });
};

export { ProtectedRouteMiddleware };
