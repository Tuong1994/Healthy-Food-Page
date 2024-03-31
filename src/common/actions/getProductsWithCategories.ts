import { ApiQuery } from "@/services/type";
import { ParsedUrlQuery } from "querystring";
import { getProductsWithCategories as getProductsByCategories } from "@/services/product/api";
import { ELang } from "../enum";

export const getProductsWithCategories = async (query: ParsedUrlQuery) => {
  const apiQuery: ApiQuery = { langCode: query.langCode as ELang, hasCate: true, hasLike: true };
  const response = await getProductsByCategories(apiQuery);
  return response;
};
