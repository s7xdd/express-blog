import { Response } from "express";

interface ResponseOptions {
  res: Response;
  statusCode: number;
  data: any;
  message: string;
}

export const ResponseHandler = {
  success: ({ res, statusCode, data, message }: ResponseOptions) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  },

  error: ({ res, statusCode, message, ...props }: Omit<ResponseOptions, "data">) => {
    res.status(statusCode).json({
      success: false,
      message,
      ...props,
    });
  },
};
