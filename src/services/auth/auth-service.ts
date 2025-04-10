import * as bcrypt from "bcrypt";
import { UserModel } from "../../models/user-schema";
import { comparePasswords, handleUserExistence } from "../../utils/helper/auth/auth-functions";
import { generateJwt } from "../../utils/helper/jwt/jwt-functions";

export const AuthService = {
  async register(username: string, password: string): Promise<any> {
    await handleUserExistence({ username, throwUserExistsError: true });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ username, password: hashedPassword });
    await newUser.save();

    return newUser;
  },

  async login(username: string, password: string): Promise<{ token: string; username: string }> {
    const { user } = await handleUserExistence({ username, throwNoUserExistsError: true });

    const passwordValid = await comparePasswords({
      plainPassword: password,
      hashedPassword: user!.password,
    });

    if (!passwordValid) {
      throw new Error("Invalid credentials");
    }

    const token = generateJwt(user!);

    return { token, username: user!.username };
  },
};
