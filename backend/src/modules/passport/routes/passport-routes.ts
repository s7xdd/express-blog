import express from 'express';
import passport from 'passport';

import { ResponseHandler } from '../../../shared/components/response-handler/response-handler';
import '../strategies/local-strategy';
import { passportController } from '../controller/passport-controller';
import { validateData } from '../../../shared/middlewares/common-middleware';
import { otpValidationSchema, registerValidationSchema, resendOtpValidationSchema } from '../../auth/valitdators/auth-validator';
import { protectRouteMiddleware } from '../middleware/protected-route-middlware';


const passportRoutes = express.Router();

passportRoutes.post("/register", validateData(registerValidationSchema), passportController.registerUser);


passportRoutes.post('/login', async (req, res, next) => {
    passport.authenticate('local', { session: true }, async (err: any, user: any, info: any) => {
        if (err) return next(err);

        if (!user) {
            if (info?.message === "User not verified") {
                return passportController.login(req, res, next);
            }

            return ResponseHandler.error({
                res,
                statusCode: 401,
                message: info?.message || "Authentication failed",
            });
        }

        req.login(user, (err) => {
            if (err) return next(err);
            return ResponseHandler.success({
                res,
                data: req.user,
                message: "Login successful",
            });
        });
    })(req, res, next);
});


passportRoutes.post("/verify-otp", validateData(otpValidationSchema), passportController.verifyOtp);
passportRoutes.post("/resend-otp", validateData(resendOtpValidationSchema), passportController.resendOtp);


passportRoutes.get("/get-user", protectRouteMiddleware, passportController.userDetails);

export default passportRoutes;  