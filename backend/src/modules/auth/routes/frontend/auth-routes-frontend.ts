import { Router } from "express";
import { validateData } from "../../../../shared/middlewares/common-middleware";
import { loginValidationSchema, registerValidationSchema, otpValidationSchema, resendOtpValidationSchema } from "../../valitdators/auth-validator";
import { frontendAuthController } from "../../controllers/frontend/auth-controller-frontend";

const frontendAuthRoutes = Router();

frontendAuthRoutes.post("/register", validateData(registerValidationSchema), frontendAuthController.registerUser);
frontendAuthRoutes.post("/login", validateData(loginValidationSchema), frontendAuthController.loginUser);

//OTP Routes
frontendAuthRoutes.post("/verify-otp", validateData(otpValidationSchema), frontendAuthController.verifyOtp);
frontendAuthRoutes.post("/resend-otp", validateData(resendOtpValidationSchema), frontendAuthController.resendOtp);

export default frontendAuthRoutes;
