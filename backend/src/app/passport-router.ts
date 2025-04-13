import { Router } from "express";
import { passportModule } from "../modules/passport/passport-module";

const passportRouter = Router();

passportRouter.use("/auth", passportModule.routes.v1)

export default passportRouter;