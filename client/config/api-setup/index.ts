import { createServerConnectAPI } from "./api-connect";

const apiClient = createServerConnectAPI();

const apiServer = createServerConnectAPI(true);

export { apiClient, apiServer };
