import { Router } from "express";
import { validateData } from "../../middlewares/common-middleware";
import { loginValidationSchema } from "../../validators/auth/auth-validator";
import { AuthController } from "../../controlller/auth-controller";

const authRouter = Router();

authRouter.post("/register", validateData(loginValidationSchema), AuthController.registerUser);
authRouter.post("/login", validateData(loginValidationSchema), AuthController.loginUser);

export default authRouter;
