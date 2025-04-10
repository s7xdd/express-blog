import { Router } from "express";
import { validateData } from "../../../middlewares/common-middleware";
import { loginValidationSchema, registerValidationSchema } from "../../../validators/auth/auth-validator";
import { AuthController } from "../../../controlller/front-end/auth/auth-controller";

const authRouter = Router();

authRouter.post("/register", validateData(registerValidationSchema), AuthController.registerUser);
authRouter.post("/login", validateData(loginValidationSchema), AuthController.loginUser);

export default authRouter;
