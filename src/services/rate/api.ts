import { getApiQuery } from "../helper";
import { ApiQuery, Paging } from "../type";
import { Rate, RateFormData } from "./type";
import rateApiPaths from "./path";
import Fetch from "..";

export const getRates = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Rate>>(rateApiPaths.getList + getApiQuery(query));
  return response;
};

export const getRatesByUser = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Rate>>(rateApiPaths.getListByUser + getApiQuery(query));
  return response;
};

export const getRate = async (query: ApiQuery) => {
  const response = await Fetch.Get<Rate>(rateApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createRate = async (data: RateFormData) => {
  const response = await Fetch.Post<RateFormData, Rate>(rateApiPaths.create, data);
  return response;
};

export const updateRate = async (query: ApiQuery, data: RateFormData) => {
  const response = await Fetch.Put<RateFormData, any>(rateApiPaths.update + getApiQuery(query), data);
  return response;
};

export const removeRates = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(rateApiPaths.remove + getApiQuery(query));
  return response;
};
