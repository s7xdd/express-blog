import { Request, Response, NextFunction } from "express";
import { createMulterInstance } from "../config/multer-config";
import { handleUploadedFiles } from "../controller/image-upload-controller";

export const uploadMiddleware = (fields: { name: string; maxCount?: number }[], outputDir: string) => {
  const multerInstance = createMulterInstance(fields);

  return [
    multerInstance,
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        req.body.images = await handleUploadedFiles(req, outputDir);
        next();
      } catch (error) {
        next(error);
      }
    },
  ];
};
