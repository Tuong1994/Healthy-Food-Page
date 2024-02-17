import type { ApiQuery } from "@/services/type";
import { ParsedUrlQuery } from "querystring";
import { ELang } from "../enum";
import { getProduct } from "@/services/product/api";

export const getProductDetail = async (query: ParsedUrlQuery) => {
  const apiQuery: ApiQuery = {
    productId: query.id as string,
    langCode: query.langCode as ELang,
    hasCate: true,
    hasLike: true,
    convertName: true,
  };
  const response = await getProduct(apiQuery);
  return response;
};
