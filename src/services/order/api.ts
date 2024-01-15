import { getApiQuery } from "../helper";
import { ApiQuery, Paging } from "../type";
import { Order, OrderFormData } from "./type";
import orderApiPaths from "./path";
import Fetch from "..";

export const getOrders = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Order>>(orderApiPaths.getList + getApiQuery(query));
  return response;
};

export const getOrdersByCustomer = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Order>>(orderApiPaths.getListByCustomer + getApiQuery(query));
  return response;
};

export const getOrder = async (query: ApiQuery) => {
  const response = await Fetch.Get<Order>(orderApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createOrder = async (data: OrderFormData) => {
  const response = await Fetch.Post<OrderFormData, Order>(orderApiPaths.create, data);
  return response;
};

export const updateOrder = async (query: ApiQuery, data: OrderFormData) => {
  const response = await Fetch.Put<OrderFormData, any>(orderApiPaths.update + getApiQuery(query), data);
  return response;
};

export const removeOrders = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(orderApiPaths.remove + getApiQuery(query));
  return response;
};
