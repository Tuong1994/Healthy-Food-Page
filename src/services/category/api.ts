import { getApiQuery } from "../helper";
import { ApiQuery, List, Paging } from "../type";
import { Category, CategoryFormData } from "./type";
import categoryApiPaths from "./path";
import Fetch from "..";

export const getCategories = async (query: ApiQuery) => {
  const response = await Fetch.Get<List<Category>>(categoryApiPaths.getList + getApiQuery(query));
  return response;
};

export const getCategoriesPaging = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<Category>>(categoryApiPaths.getListPaging + getApiQuery(query));
  return response;
};

export const getCategory = async (query: ApiQuery) => {
  const response = await Fetch.Get<Category>(categoryApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createCategory = async (data: CategoryFormData) => {
  const response = await Fetch.Post<CategoryFormData, Category>(categoryApiPaths.create, data);
  return response;
};

export const updateCategory = async (query: ApiQuery, data: CategoryFormData) => {
  const response = await Fetch.Put<CategoryFormData, any>(categoryApiPaths.update + getApiQuery(query), data);
  return response;
};

export const removeCategories = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(categoryApiPaths.remove + getApiQuery(query));
  return response;
};
