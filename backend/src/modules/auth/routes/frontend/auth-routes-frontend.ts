import { Router } from "express";
import { validateData } from "../../../../shared/middlewares/common-middleware";
import { loginValidationSchema, registerValidationSchema } from "../../valitdators/auth-validator";
import { FrontendAuthController } from "../../controllers/frontend/auth-controller-frontend";

const frontendAuthRouter = Router();

frontendAuthRouter.post("/register", validateData(registerValidationSchema), FrontendAuthController.registerUser);
frontendAuthRouter.post("/login", validateData(loginValidationSchema), FrontendAuthController.loginUser);

export default frontendAuthRouter;
