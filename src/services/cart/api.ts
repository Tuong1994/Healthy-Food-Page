import { getApiQuery } from "../helper";
import { ApiQuery, Paging } from "../type";
import { Cart, CartFormData } from "./type";
import cartApiPaths from "./path";
import Fetch from "..";

export const getCarts = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Cart>>(cartApiPaths.getList + getApiQuery(query));
  return response;
};

export const getCart = async (query: ApiQuery) => {
  const response = await Fetch.Get<Cart>(cartApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createCart = async (data: CartFormData) => {
  const response = await Fetch.Post<Cart>(cartApiPaths.create, data);
  return response;
};

export const updateCart = async (query: ApiQuery, data: CartFormData) => {
  const response = await Fetch.Put<any>(cartApiPaths.update + getApiQuery(query), data);
  return response;
};

export const removeCarts = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(cartApiPaths.remove + getApiQuery(query));
  return response;
};
