import { getApiQuery } from "../helper";
import { ApiQuery, List, Paging } from "../type";
import { Ward, WardFormData } from "./type";
import wardApiPaths from "./path";
import Fetch from "..";

export const getWards = async (query: ApiQuery) => {
  const response = await Fetch.Get<List<Ward>>(wardApiPaths.getList + getApiQuery(query));
  return response;
};

export const getWardsPaging = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Ward>>(wardApiPaths.getListPaging + getApiQuery(query));
  return response;
};

export const getWard = async (query: ApiQuery) => {
  const response = await Fetch.Get<Ward>(wardApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createWard = async (data: WardFormData) => {
  const response = await Fetch.Post<WardFormData, Ward>(wardApiPaths.create, data);
  return response;
};

export const updateWard = async (query: ApiQuery, data: WardFormData) => {
  const response = await Fetch.Put<WardFormData, any>(wardApiPaths.update + getApiQuery(query), data);
  return response;
};

export const removeWards = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(wardApiPaths.remove + getApiQuery(query));
  return response;
};
