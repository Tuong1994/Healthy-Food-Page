import { getApiQuery } from "../helper";
import { ApiQuery, Paging } from "../type";
import { Customer } from "./type";
import customerApiPaths from "./path";
import Fetch from "..";

export const getCustomers = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Customer>>(customerApiPaths.getList + getApiQuery(query));
  return response;
};

export const getCustomer = async (query: ApiQuery) => {
  const response = await Fetch.Get<Customer>(customerApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createCustomer = async (data: FormData) => {
  const response = await Fetch.Post<FormData, Customer>(customerApiPaths.create, data);
  return response;
};

export const updateCustomer = async (query: ApiQuery, data: FormData) => {
  const response = await Fetch.Put<FormData, any>(customerApiPaths.update + getApiQuery(query), data);
  return response;
};

export const removeCustomers = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(customerApiPaths.remove + getApiQuery(query));
  return response;
};
