import { getApiQuery } from "../helper";
import { ApiQuery, Paging } from "../type";
import { User } from "./type";
import userApiPaths from "./path";
import Fetch from "..";

export const getUsers = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<User>>(userApiPaths.getList + getApiQuery(query));
  return response;
};

export const getUser = async (query: ApiQuery) => {
  const response = await Fetch.Get<User>(userApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createUser = async (data: FormData) => {
  const response = await Fetch.Post<FormData, User>(userApiPaths.create, data);
  return response;
};

export const updateUser = async (query: ApiQuery, data: FormData) => {
  const response = await Fetch.Put<FormData, any>(userApiPaths.update + getApiQuery(query), data);
  return response;
};

export const removeUsers = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(userApiPaths.remove + getApiQuery(query));
  return response;
};
