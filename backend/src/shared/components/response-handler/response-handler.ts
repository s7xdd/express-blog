import { Response } from "express";

interface BaseResponseOptions {
  res: Response;
  statusCode?: number;
  message?: string;
  props?: Record<string, any>;
}

interface SuccessOptions extends BaseResponseOptions {
  data?: any;
  totalCount?: any;
}

interface ErrorOptions extends BaseResponseOptions {
  error?: any;
}

export const ResponseHandler = {
  success: ({
    res,
    statusCode = 200,
    message = "Success",
    data = null,
    totalCount = 0,
    props = {},
  }: SuccessOptions) => {
    res.status(statusCode).json({
      success: true,
      message,
      data,
      totalCount,
      ...props,
    });
  },

  error: ({ res, statusCode = 500, message = "Something went wrong", error = null, props = {} }: ErrorOptions) => {
    res.status(statusCode).json({
      success: false,
      message,
      error,
      ...props,
    });
  },
};
