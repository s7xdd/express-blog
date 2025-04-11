import { toast } from "react-toastify";
import { apiClient } from "../api-setup";

export const handleApiRequest = async (
  endpoint: string,
  method: "get" | "post" | "delete",
  options: {
    data?: any;
    params?: Record<string, any>;
    toastSuccess?: boolean;
    toastError?: boolean;
  } = {},
): Promise<{ data: any | null; error: Error | null }> => {
  const { data, params, toastSuccess = false, toastError = false } = options;

  try {
    const config: any = {
      params,
    };

    // if (data instanceof FormData) {
    //   config.headers["Content-Type"] = "multipart/form-data";
    // }

    const response = await apiClient[method](endpoint, data || {}, config);

    console.log("responseresponse",response)

    if (response?.data?.error) {
      throw response.data;
    }
    
    if (toastSuccess && response?.data?.message) {
      toast.success(response.data.message);
    } 

    return { data: response.data, error: null };

  } catch (error: any) {
    console.error("API Error Object:", error);

    const errorMsg: any = handleApiErrorMessage(error);

    if (toastError) {
      toast.error(errorMsg);
    }

    console.error("Final Processed Error:", errorMsg);

    return { data: null, error };
  }
};

export const handleApiErrorMessage = (err: any) => {
  let errorMsg = "An unexpected error occurred";
  if (err?.validation && typeof err.validation === "object") {
    const messages = Object.values(err.validation).filter((msg) => typeof msg === "string");
    if (messages.length) {
      errorMsg = messages.join(", ");
      return { errorMsg };
    }
  } else if (err?.validation && typeof err.validation === "string") {
    errorMsg = err?.validation;
    return { errorMsg };
  }

  if (typeof err?.message === "string") {
    errorMsg = err.message;
  } else if (typeof err?.message === "object") {
    errorMsg = JSON.stringify(err.message);
  } else if (Array.isArray(err?.message)) {
    errorMsg = err.message.join(", ");
  }
  return { errorMsg };
};
