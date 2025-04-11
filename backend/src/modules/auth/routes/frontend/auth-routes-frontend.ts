import { Router } from "express";
import { validateData } from "../../../../shared/middlewares/common-middleware";
import { loginValidationSchema, registerValidationSchema } from "../../valitdators/auth-validator";
import { frontendAuthController } from "../../controllers/frontend/auth-controller-frontend";

const frontendAuthRouter = Router();

frontendAuthRouter.post("/register", validateData(registerValidationSchema), frontendAuthController.registerUser);
frontendAuthRouter.post("/login", validateData(loginValidationSchema), frontendAuthController.loginUser);

export default frontendAuthRouter;
