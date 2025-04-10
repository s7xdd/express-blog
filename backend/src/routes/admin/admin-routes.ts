import express from "express";

import { ProtectedRouteMiddleware } from "../../middlewares/auth/auth-middleware";
import { PermissionMiddleware } from "../../middlewares/admin/permission-middleware";

const adminRoutes = express.Router();

adminRoutes.use(ProtectedRouteMiddleware)
adminRoutes.use(PermissionMiddleware);

adminRoutes.use('/blogs', adminRoutes);

export default adminRoutes; 