import type { ApiQuery } from "@/services/type";
import { ParsedUrlQuery } from "querystring";
import { ELang } from "../enum";
import { getCategories } from "@/services/category/api";
import { getProductsPaging } from "@/services/product/api";

export const getProductsByCategories = async (query: ParsedUrlQuery) => {
  const apiCategoryQuery: ApiQuery = { langCode: query.langCode as ELang };
  const categories = await getCategories(apiCategoryQuery);
  const products =
    categories.data.items?.map(async (category) => {
      const apiProductsQuery: ApiQuery = {
        page: 1,
        limit: 10,
        langCode: query.langCode as ELang,
        categoryId: category.id,
      };
      const response = await getProductsPaging(apiProductsQuery);
      return response;
    }) || [];
  const items = await Promise.all(products);
  return items;
};
