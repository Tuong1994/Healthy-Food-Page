import type { ApiQuery } from "@/services/type";
import { ParsedUrlQuery } from "querystring";
import { getProductsPaging } from "@/services/product/api";

export const getProductsByCateAndSubcate = async (query: ParsedUrlQuery) => {
  const apiQuery = { ...query, hasCate: true, hasLike: true } as ApiQuery;
  const response = await getProductsPaging({ ...apiQuery });
  return response;
};
