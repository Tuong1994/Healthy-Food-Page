import { getApiQuery } from "../helper";
import { ApiQuery, List, Paging } from "../type";
import { Product, ProductFormData } from "./type";
import productApiPaths from "./path";
import Fetch from "..";

export const getProducts = async (query: ApiQuery) => {
  const response = await Fetch.Get<List<Product>>(productApiPaths.getList + getApiQuery(query));
  return response;
};

export const getProductsPaging = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Product>>(productApiPaths.getListPaging + getApiQuery(query));
  return response;
};

export const getProduct = async (query: ApiQuery) => {
  const response = await Fetch.Get<Product>(productApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createProduct = async (data: ProductFormData) => {
  const response = await Fetch.Post<ProductFormData, Product>(productApiPaths.create, data);
  return response;
};

export const updateProduct = async (query: ApiQuery, data: ProductFormData) => {
  const response = await Fetch.Put<ProductFormData, any>(productApiPaths.update + getApiQuery(query), data);
  return response;
};

export const removeProducts = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(productApiPaths.remove + getApiQuery(query));
  return response;
};
