import * as bcrypt from "bcrypt";

import { decodeJwt } from "../jwt/jwt-functions";
import { UserModel } from "../../../models/user-schema";
import { ResponseHandler } from "../../../components/response-handler/response-handler";

export const checkUserExists = async (username: string): Promise<boolean> => {
  const user = await UserModel.findOne({ username });
  return !!user;
};
export const handleUserExistence = async ({
  res,
  username,
  throwUserExistsError = false,
  throwNoUserExistsError = false,
}: {
  username: string;
  throwUserExistsError?: boolean;
  throwNoUserExistsError?: boolean;
  res?: any;
}) => {
  const user = await UserModel.findOne({ username });
  const userExists = !!user;

  if (userExists) {
    if (throwUserExistsError && res) {
      ResponseHandler.error({ res, statusCode: 409, message: "User already exists" });
    }
    return {
      user,
    };
  } else {
    if (throwNoUserExistsError && res) {
      ResponseHandler.error({ res, statusCode: 404, message: `User with username "${username}" does not exist` });
    }
    return {
      user,
    };
  }
};

export const comparePasswords = async ({
  plainPassword,
  hashedPassword,
}: {
  plainPassword: string;
  hashedPassword: string;
}): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};

export const getJWTUserDetails = async (req: any) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  const userDetails = await decodeJwt(token);
  return userDetails;
};
