import { ApiConfig, ApiResponse, ResponseError } from "./type";
import { requestManager } from "./manager";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import AxiosInstance, { HttpStatus } from "./axios";

const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const defaultApiResponse = <T>(): ApiResponse<T> => ({ data: {} as T, success: false });

export const ApiResponseError = (error: any) => {
  let responseError: ResponseError = { status: 0, message: "" };
  const status = error.response.data.statusCode;
  const message = error.response?.data.message;
  responseError = {
    status: status ? status : error.response?.status || 0,
    message: message ? message : error.response?.statusText || "",
  };
  return responseError;
};

const call = async <T = unknown, D = any>(apiConfig: ApiConfig<T>) => {
  const { method, apiPath, body, config, abortKey = "" } = apiConfig;
  const initConfig: AxiosRequestConfig<T> = {
    method,
    url: apiPath,
    timeout: 3000,
    ...config,
  };
  let controller: AbortController | null = null;
  if (abortKey) {
    controller = requestManager.create(abortKey);
    initConfig.signal = controller.signal;
  }
  if (method !== Method.GET && body !== undefined) initConfig.data = body;
  let apiResponse: ApiResponse<D> = defaultApiResponse<D>();
  try {
    const response = (await AxiosInstance<T, D>(initConfig)) as AxiosResponse<any, D>;
    apiResponse = { ...apiResponse, success: true, data: response.data };
  } catch (err: any) {
    if (err?.name === "CanceledError" || axios.isCancel(err)) {
      apiResponse = {
        ...apiResponse,
        success: false,
        error: { status: 0, message: "Request canceled" },
      };
      if (abortKey) requestManager.abort(abortKey);
    } else if (!err.response) {
      if (err.code === "ECONNABORTED") {
        return (apiResponse = {
          ...apiResponse,
          success: false,
          error: { status: 504, message: "Request timeout" },
        });
      } 
      apiResponse = {
        ...apiResponse,
        success: false,
        error: { status: 500, message: "Api network failed" },
      };
    } else {
      apiResponse = { ...apiResponse, success: false, error: ApiResponseError(err) };
    }
  }
  return apiResponse;
};

const Get = <D>(apiPath: string, abortKey?: string, config?: AxiosRequestConfig) => {
  return call<any, D>({ method: Method.GET, apiPath, abortKey, config });
};
const Post = <T, D = any>(apiPath: string, body: T, abortKey?: string, config?: AxiosRequestConfig<T>) => {
  return call<T, D>({ method: Method.POST, apiPath, body, abortKey, config });
};
const Put = <T, D = any>(apiPath: string, body: T, abortKey?: string, config?: AxiosRequestConfig<T>) => {
  return call<T, D>({ method: Method.PUT, apiPath, body, abortKey, config });
};
const Delete = <D>(apiPath: string, abortKey?: string, config?: AxiosRequestConfig) => {
  return call<any, D>({ method: Method.DELETE, apiPath, abortKey, config });
};

const Fetch = { Get, Post, Put, Delete };

export default Fetch;
