import { getApiQuery } from "../helper";
import { ApiQuery, List, Paging } from "../type";
import { SubCategory, SubCategoryFormData } from "./type";
import subCategoryApiPaths from "./path";
import Fetch from "..";

export const getSubCategories = async (query: ApiQuery) => {
  const response = await Fetch.Get<List<SubCategory>>(subCategoryApiPaths.getList + getApiQuery(query));
  return response;
};

export const getSubCategoriesPaging = async (query: ApiQuery) => {
  const response = await Fetch.Get<Paging<SubCategory>>(
    subCategoryApiPaths.getListPaging + getApiQuery(query)
  );
  return response;
};

export const getSubCategory = async (query: ApiQuery) => {
  const response = await Fetch.Get<SubCategory>(subCategoryApiPaths.getDetail + getApiQuery(query));
  return response;
};

export const createSubCategory = async (data: SubCategoryFormData) => {
  const response = await Fetch.Post<SubCategoryFormData, SubCategory>(subCategoryApiPaths.create, data);
  return response;
};

export const updateSubCategory = async (query: ApiQuery, data: SubCategoryFormData) => {
  const response = await Fetch.Put<SubCategoryFormData, any>(
    subCategoryApiPaths.update + getApiQuery(query),
    data
  );
  return response;
};

export const removeSubCategories = async (query: ApiQuery) => {
  const response = await Fetch.Delete<any>(subCategoryApiPaths.remove + getApiQuery(query));
  return response;
};
