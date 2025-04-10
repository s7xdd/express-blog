import * as bcrypt from "bcrypt";

import { decodeJwt } from "../jwt/jwt-functions";
import { UserService } from "../../../services/user/user-service";

export const handleUserExistence = async ({
  username,
  throwUserExistsError = false,
  throwNoUserExistsError = false,
}: {
  username: string;
  throwUserExistsError?: boolean;
  throwNoUserExistsError?: boolean;
}) => {
  const user = await UserService.findUserByUsername({ username });
  const userExists = !!user;

  if (userExists) {
    if (throwUserExistsError) {
      throw new Error("User already exists");
    }
    return {
      user,
    };
  } else {
    if (throwNoUserExistsError) {
      throw new Error(`User does not exist`);
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
