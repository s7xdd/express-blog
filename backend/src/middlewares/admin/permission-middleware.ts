export const PermissionMiddleware = (req: any, res: any, next: any) => {
    if (req.user.is_admin) {
        next();
    } else {
        res.status(403).json({ message: "Unauthorized" });
    }
};