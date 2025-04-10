import { Router } from "express";
import { loginValidationSchema } from "../../valitdators/auth-validator";
import { validateData } from "../../../../shared/middlewares/common-middleware";
import { AdminAuthController } from "../../controllers/admin/auth-controller-admin";

const adminAuthRouter = Router();

adminAuthRouter.use('/login', validateData(loginValidationSchema), AdminAuthController.loginUser);

export default adminAuthRouter;