import { Router } from "express";
import { validateData } from "../../../../shared/middlewares/common-middleware";
import { loginValidationSchema, registerValidationSchema } from "../../valitdators/auth-validator";
import { frontendAuthController } from "../../controllers/frontend/auth-controller-frontend";

const frontendAuthRoutes = Router();

frontendAuthRoutes.post("/register", validateData(registerValidationSchema), frontendAuthController.registerUser);
frontendAuthRoutes.post("/login", validateData(loginValidationSchema), frontendAuthController.loginUser);

export default frontendAuthRoutes;
