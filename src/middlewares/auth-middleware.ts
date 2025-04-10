import jwt from "jsonwebtoken";
import { ResponseHandler } from "../components/response-handler/response-handler";

const ProtectedRouteMiddleware = (req: any, res: any, next: any) => {
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

  jwt.verify(token, process.env.JWT_KEY!, (err: any, decoded: any) => {
    console.log("decoded", process.env.JWT_KEY);
    if (err)
      return ResponseHandler.error({
        res,
        statusCode: 403,
        message: "Unauthorized",
      });
    next();
  });
};

export { ProtectedRouteMiddleware };
