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

      const newUser = await userModule.services.common.createUser({
        ...allowedFields,
        otp: otp.otp,
        otp_expiry: otp.otpExpiry,
        password: hashedPassword,
      });

      const payload = createPayload(newUser!, ["_id", "username", "email", "bio", "avatar_url", "date_registered", "otp"]);


      ResponseHandler.success({
        res,
        statusCode: 201,
        message: "User registered successfully",
        data: payload,
      });
    } catch (error) {
      next(error);
    }
  },

  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password, otpRequired } = req.body;

      const requireOtp = otpRequired !== false;

      const { user }: { user: any } = await handleUserExistence({ username, throwNoUserExistsError: true });

      const isPasswordValid = await comparePasswords({
        plainPassword: password,
        hashedPassword: user!.password,
      });

      if (!isPasswordValid) throw new Error("Invalid credentials");

      const userPayload = createPayload(user!, ["_id", "username", "email", "bio", "avatar_url", "date_registered", "is_verified"]);

      if (!user.is_verified && requireOtp) {
        const newOtp = await otpModule.services.otp.generateOtp();
        await userModule.services.common.updateUser(user._id, { otp: newOtp.otp, otp_expiry: newOtp.otpExpiry });

        ResponseHandler.error({
          res,
          statusCode: 200,
          message: "User not verified",
          props: {
            data: {
              ...userPayload
            },
            otp: newOtp.otp,
          }
        });
      } else {
        const token = generateJwt(user!);
        ResponseHandler.success({
          res,
          statusCode: 200,
          message: "Login successful",
          data: { userPayload, token },
        });
      }


    } catch (error) {
      next(error);
    }
  },

  async verifyOtp(req: any, res: Response, next: NextFunction) {
    try {
      const { otp, username } = req.body;

      const { user }: any = await handleUserExistence({ username: username, throwNoUserExistsError: true, throwUserVerifiedError: true });

      const isOtpValid = await otpModule.services.otp.validateOtp({ userData: user, inputOtp: otp });

      if (!isOtpValid) {
        throw new Error("Invalid OTP");
      }

      console.log("useruser", user, otp)

      const newUser = await userModule.services.common.updateUser(user._id, { is_verified: true });

      const userPayload = createPayload(newUser!, ["_id", "username", "email", "bio", "avatar_url", "date_registered", "is_verified"]);

      const token = generateJwt(newUser!);

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

      const user: any = await handleUserExistence({ username: username, throwNoUserExistsError: true, throwUserVerifiedError: true });

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
