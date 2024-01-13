import { RequestInit } from "next/dist/server/web/spec-extension/request";
import { ApiResponse, ResponseError } from "./type";

const Method = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

const HttpStatus = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER: 500,
};

const BASE_URL = "http://localhost:5000/";

const defaultApiResponse = <T>(): ApiResponse<T> => ({ data: {} as T });

const ApiResponseError = (error?: any, response?: Response) => {
  let responseError: ResponseError | null = null;
  if (error) {
    responseError = { status: 500, message: "Api network error" };
  } else {
    responseError = { status: response?.status ?? 0, message: response?.statusText ?? "" };
  }
  return responseError;
};

const call = async <T>(method: string, apiPath: string, body?: object | null, init?: RequestInit) => {
  const requestInit: RequestInit = {
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer token",
    },
    body: null,
    ...init,
  };

  let apiResponse: ApiResponse<T> = defaultApiResponse<T>();

  if (method !== Method.GET) requestInit.body = JSON.stringify(body);

  return fetch(BASE_URL + apiPath, requestInit)
    .then(async (response) => {
      if (response.status === HttpStatus.FORBIDDEN || response.status === HttpStatus.UNAUTHORIZED) {
        return apiResponse;
      } else {
        if (response.status === HttpStatus.BAD_REQUEST || response.status === HttpStatus.NOT_FOUND) {
          apiResponse = { ...apiResponse, success: false, error: ApiResponseError(null, response) };
          return apiResponse;
        }
        const data = await response.json();
        apiResponse = { ...apiResponse, data, success: true };
        return apiResponse;
      }
    })
    .catch((error) => (apiResponse = { ...apiResponse, success: false, error: ApiResponseError(error) }));
};

const Get = <T>(apiPath: string, init?: RequestInit) => {
  return call<T>(Method.GET, apiPath, null, init);
};
const Post = <T>(apiPath: string, body: object = {}, init?: RequestInit) => {
  return call<T>(Method.POST, apiPath, body, init);
};
const Put = <T>(apiPath: string, body: object = {}, init?: RequestInit) => {
  return call<T>(Method.POST, apiPath, body, init);
};
const Delete = <T>(apiPath: string, init?: RequestInit) => {
  return call<T>(Method.POST, apiPath, null, init);
};

const Fetch = { Get, Post, Put, Delete };

export default Fetch;
