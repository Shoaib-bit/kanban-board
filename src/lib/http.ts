import axios from "axios";
import { getAccessToken, logout } from "./helper";

const axiosInterceptorInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

axiosInterceptorInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInterceptorInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error?.response?.status === 401) {
      logout();
    }

    return Promise.reject(error);
  }
);

export const http = axiosInterceptorInstance;
