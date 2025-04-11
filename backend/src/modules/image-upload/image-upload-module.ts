import { uploadMiddleware } from "./middlewares/upload";

export const imageUploadModule = {
  middleware: {
    uploadMiddleware: uploadMiddleware,
  },
};
