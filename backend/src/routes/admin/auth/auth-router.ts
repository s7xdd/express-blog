import { Router } from "express";
import { loginValidationSchema } from "../../../validators/auth/auth-validator";
import { validateData } from "../../../middlewares/common-middleware";
import { AuthController } from "../../../controlller/admin/auth/auth-controller";

const authRouter = Router();

authRouter.use('/login', validateData(loginValidationSchema), AuthController.loginUser);

export default authRouter;