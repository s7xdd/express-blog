import { Response } from "express";

interface ResponseOptions {
  res: Response;
  statusCode: number;
  data: any;
  message: string;
  props?: any;
}

export const ResponseHandler = {
  success: ({ res, statusCode, data, message, props }: ResponseOptions) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
      ...props,
    });
  },

  error: ({ res, statusCode, message, props }: Omit<ResponseOptions, "data">) => {
    res.status(statusCode).json({
      success: false,
      message,
      ...props,
    });
  },
};
