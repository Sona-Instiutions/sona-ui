/**
 * Axios Configuration
 *
 * Centralized Axios instance with base URL configuration, interceptors, and error handling.
 * Supports both server-side and client-side usage.
 *
 * Per ADR 004: Axios is standardized for HTTP requests across server and client boundaries.
 */

import axios, { type AxiosInstance, type AxiosError, type AxiosResponse } from 'axios';
import { IApiError } from '@/types/institution.types';

/** Get Strapi base URL from environment (server or client context) */
const getBaseURL = (): string => {
  // Server-side context (Node.js environment)
  if (typeof window === 'undefined') {
    const serverUrl = process.env.STRAPI_API_URL;
    if (!serverUrl) {
      throw new Error('STRAPI_API_URL environment variable is not set');
    }
    return serverUrl;
  }

  // Client-side context (browser)
  const clientUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL;
  if (!clientUrl) {
    throw new Error('NEXT_PUBLIC_STRAPI_API_URL environment variable is not set');
  }
  return clientUrl;
};

/** Normalize API errors to standard IApiError format */
const normalizeError = (error: AxiosError | Error | unknown): IApiError => {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 500;
    const message =
      (error.response?.data as Record<string, unknown>)?.message ||
      error.message ||
      'An error occurred while fetching data';

    return {
      status,
      message,
      details: (error.response?.data as Record<string, unknown>) || undefined,
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
    message: 'An unknown error occurred',
  };
};

/** Create and configure Axios instance with centralized error handling */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: getBaseURL(),
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
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

