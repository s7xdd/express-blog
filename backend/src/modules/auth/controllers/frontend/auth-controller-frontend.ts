import * as bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

import { ResponseHandler } from "../../../../shared/components/response-handler/response-handler";
import { otpModule } from "../../../otp/otp-module";
import { createPayload, handleUserExistence } from "../../../../shared/utils/helper/common-functions";
import { userModule } from "../../../user/user-module";
import { comparePasswords } from "../../functions/auth-functions";
import { generateJwt } from "../../functions/jwt-functions";

export const frontendAuthController = {
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      await handleUserExistence({ username, throwUserExistsError: true });

      const otp = await otpModule.services.otp.generateOtp();

      const allowedFields = createPayload(req.body, ["username", "email", "bio"]);
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser: any = await userModule.services.common.createUser({
        ...allowedFields,
        password: hashedPassword,
        otp: otp.otp,
        otp_expiry: otp.otpExpiry,
        is_verified: false,
      });

      const payload = createPayload(newUser, [
        "_id", "username", "email", "bio", "avatar_url", "date_registered", "is_verified",
      ]);

      return ResponseHandler.success({
        res,
        statusCode: 201,
        message: "User registered successfully",
        data: {
          ...payload,
          ...otp
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, otpRequired } = req.body;

      const { user }: { user: any } = await handleUserExistence({ username, throwNoUserExistsError: true });

      const isPasswordValid = await comparePasswords({ plainPassword: password, hashedPassword: user.password });
      if (!isPasswordValid) throw new Error("Invalid credentials");

      const otpResponse = await otpModule.services.otp.handleOtp({ user, otpRequired });

      if (otpResponse) {
        return ResponseHandler.error({
          res,
          statusCode: 200,
          message: "User not verified",
          props: {
            data: otpResponse.userPayload,
            otp: otpResponse.otp,
          },
        });
      }

      const userPayload = createPayload(user, [
        "_id", "username", "email", "bio", "avatar_url", "date_registered", "is_verified",
      ]);

      const token = generateJwt(user);

      return ResponseHandler.success({
        res,
        message: "Login successful",
        data: { userPayload, token },
      });

    } catch (error) {
      next(error);
    }
  },

  async verifyOtp(req: any, res: Response, next: NextFunction) {
    try {
      const { otp, username } = req.body;

      const verifiedUser: any = await otpModule.services.otp.verifyOtp({ username, inputOtp: otp });

      const userPayload = createPayload(verifiedUser, [
        "_id", "username", "email", "bio", "avatar_url", "date_registered", "is_verified",
      ]);

      const token = generateJwt(verifiedUser);

      ResponseHandler.success({
        res,
        statusCode: 200,
        message: "OTP verified successfully",
        data: {
          ...userPayload,
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  },

  async resendOtp(req: any, res: Response, next: NextFunction) {
    try {
      const { username } = req.body;

      const { user }: any = await handleUserExistence({ username: username, throwNoUserExistsError: true, throwUserVerifiedError: true });

      const newOtp = await otpModule.services.otp.generateOtp()

      await userModule.services.common.updateUser(user._id, { otp: newOtp.otp, otp_expiry: newOtp.otpExpiry });

      ResponseHandler.success({
        res,
        statusCode: 200,
        message: "OTP resend successfully",
        data: newOtp,
      });
    } catch (error) {
      next(error);
    }
  },
};
