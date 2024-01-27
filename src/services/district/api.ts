import { getApiQuery } from "../helper";
import { ApiQuery, List, Paging } from "../type";
import { District, DistrictFormData } from "./type";
import districtApiPaths from "./path";
import Fetch from "..";

export const getDistricts = async (query: ApiQuery) => {
  const response = await Fetch.Get<List<District>>(districtApiPaths.getList + getApiQuery(query));
  return response;
};

export const getDistrictsPaging = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<District>>(districtApiPaths.getListPaging + getApiQuery(query));
  return response;
};

export const getDistrict = async (query: ApiQuery) => {
  const response = await Fetch.Get<District>(districtApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createDistrict = async (data: DistrictFormData) => {
  const response = await Fetch.Post<DistrictFormData, District>(districtApiPaths.create, data);
  return response;
};

export const updateDistrict = async (query: ApiQuery, data: DistrictFormData) => {
  const response = await Fetch.Put<DistrictFormData, any>(districtApiPaths.update + getApiQuery(query), data);
  return response;
};

export const removeDistricts = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(districtApiPaths.remove + getApiQuery(query));
  return response;
};
