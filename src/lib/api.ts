import axios, { AxiosError, AxiosInstance, type AxiosRequestHeaders } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

// Keys used in localStorage
const ACCESS_TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

const env = import.meta.env as Record<string, string | boolean | undefined>;
const baseURL = (env.VITE_API_BASE_URL as string) ?? (process.env.VITE_API_BASE_URL ?? '');
const timeout = Number((env.VITE_API_TIMEOUT as string) ?? process.env.VITE_API_TIMEOUT ?? 15000);

const api: AxiosInstance = axios.create({ baseURL, timeout });

export function setTokens(access: string, refresh?: string) {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  } catch {
    // ignore storage errors
  }
}

export function clearTokens() {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch {
    // ignore storage errors
  }
}

// Request interceptor: attach Authorization header if access token exists
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
  if (!config.headers) config.headers = {} as AxiosRequestHeaders;
  (config.headers as AxiosRequestHeaders).Authorization = `Bearer ${token}`;
    }
  } catch {
    // ignore
  }
  return config;
});

// Response interceptor: on 401 clear tokens and redirect to /login
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      clearTokens();
      try {
        // redirect to login page
        if (typeof window !== 'undefined') window.location.href = '/login';
      } catch {
        // ignore in non-browser environments
      }
    }
    return Promise.reject(error);
  }
);

export default api;
