import axios, { type AxiosInstance, type AxiosError, type AxiosResponse } from "axios";
import { IApiError } from "@/types/institution.types";
import {
  STRAPI_CLIENT_TOKEN,
  STRAPI_CLIENT_URL,
  STRAPI_SERVER_TOKEN,
  STRAPI_SERVER_URL,
} from "@/constants/app.constants";

const getBaseURL = (): string => {
  // Server-side context (Node.js environment)
  if (typeof window === "undefined") {
    return STRAPI_SERVER_URL || "";
  }

  return STRAPI_CLIENT_URL || "";
};

const getStrapiToken = (): string => {
  if (typeof window === "undefined") {
    return STRAPI_SERVER_TOKEN || "";
  }

  return STRAPI_CLIENT_TOKEN || "";
};

const extractMessage = (data: unknown): string | undefined => {
  if (typeof data === "object" && data !== null && "message" in data) {
    const { message } = data as { message?: unknown };

    if (typeof message === "string") {
      return message;
    }
  }

  return undefined;
};

const extractDetails = (data: unknown): Record<string, unknown> | undefined => {
  if (typeof data === "object" && data !== null && !Array.isArray(data)) {
    return data as Record<string, unknown>;
  }

  return undefined;
};

/** Normalize API errors to standard IApiError format */
const normalizeError = (error: AxiosError | Error | unknown): IApiError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 500;
    const message = extractMessage(error.response?.data) || error.message || "An error occurred while fetching data";

    return {
      status,
      message,
      details: extractDetails(error.response?.data),
    };
  }

  if (error instanceof Error) {
    return {
      status: 500,
      message: error.message,
    };
  }

  return {
    status: 500,
    message: "An unknown error occurred",
  };
};

/** Create and configure Axios instance with centralized error handling */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: getBaseURL(),
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  /** Request interceptor attaches Strapi token when available */
  instance.interceptors.request.use((config) => {
    const token = getStrapiToken();

    if (token) {
      config.headers = config.headers ?? {};

      if (!("Authorization" in config.headers)) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  });

  /** Response interceptor normalizes errors to standard format */
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError | Error | unknown) => {
      const normalizedError = normalizeError(error);
      return Promise.reject(normalizedError);
    }
  );

  return instance;
};

/** Singleton Axios instance with consistent configuration across app */
export const axiosInstance = createAxiosInstance();

export default axiosInstance;
