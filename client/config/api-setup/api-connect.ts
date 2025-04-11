import axios from "axios";
import { getToken } from "../../utils/storage";

const token = getToken();

export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
export const consumer_key = process.env.NEXT_CONSUMER_KEY;
export const consumer_secret = process.env.NEXT_SECRET_KEY;

export const createServerConnectAPI = (authRequired = false) => {
  const headers = {
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : undefined,
  };

  const requestOptions: any = {
    baseURL: baseUrl,
    headers: headers,
  };

  if (authRequired) {
    requestOptions.auth = {
      username: consumer_key,
      password: consumer_secret,
    };
  }

  if (!token) {
    requestOptions.withCredentials = true
  }

  const apiClient = axios.create(requestOptions);

  apiClient.interceptors.request.use(requestInterceptor);
  apiClient.interceptors.response.use(responseInterceptor);

  return apiClient;
};

const requestInterceptor = (config: any) => {
  const token = getToken();
  console.log("tokentoken", token)
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete config.headers["Authorization"];
  }
  return config;
};

const responseInterceptor = (response: any) => {
  if (response.data.status === 400) {
    throw new Error("Bad Request");
  }
  return response;
};
