import { City, CityFormData } from "./type";
import { ApiQuery, List, Paging } from "../type";
import { getApiQuery } from "../helper";
import cityApiPaths from "./path";
import Fetch from "..";

export const getCities = async (query: ApiQuery) => {
  const response = await Fetch.Get<List<City>>(cityApiPaths.getList + getApiQuery(query));
  return response;
};

export const getCitiesPaging = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<City>>(cityApiPaths.getListPaging + getApiQuery(query));
  return response;
};

export const getCity = async (query: ApiQuery) => {
  const response = await Fetch.Get<City>(cityApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createCity = async (data: CityFormData) => {
  const response = await Fetch.Post<CityFormData, City>(cityApiPaths.create, data);
  return response;
};

export const updateCity = async (query: ApiQuery, data: CityFormData) => {
  const response = await Fetch.Put<CityFormData, any>(cityApiPaths.update + getApiQuery(query), data);
  return response;
};

export const removeCities = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(cityApiPaths.remove + getApiQuery(query));
  return response;
};
