import * as bcrypt from "bcrypt";
import { createPayload } from "../../../../shared/utils/helper/common-functions";
import { userModule } from "../../../user/user-module";
import { comparePasswords, handleUserExistence } from "../../functions/auth-functions";
import { generateJwt } from "../../functions/jwt-functions";

export const frontendAuthService = {
  async registerUser(data: any) {
    const { username, password } = data;

    await handleUserExistence({ username, throwUserExistsError: true });

    const allowedFields = createPayload(data, ["username", "email", "bio"]);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModule.services.common.createUser({
      ...allowedFields,
      password: hashedPassword,
    });

    return createPayload(newUser!, ["_id", "username", "email", "bio", "avatar_url", "date_registered"]);
  },

  async loginUser(data: any) {
    const { username, password } = data;

    const { user } = await handleUserExistence({ username, throwNoUserExistsError: true });

    const isPasswordValid = await comparePasswords({
      plainPassword: password,
      hashedPassword: user!.password,
    });

    if (!isPasswordValid) throw new Error("Invalid credentials");

    const token = generateJwt(user!);
    const userPayload = createPayload(user!, ["_id", "username", "email", "bio", "avatar_url", "date_registered"]);

    return { ...userPayload, token };
  },
};
