import { useLang } from "@/hooks";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/category/api";
import type { ApiQuery, ApiResponse, List, ResponseError } from "@/services/type";
import type { Category } from "@/services/category/type";
import { categorySwrKey } from "../swrkey";
import useSWR, { SWRConfiguration } from "swr";
import useCategoryStore from "@/store/CategoryStore";

const useGetCategories = () => {
  const { locale } = useLang();

  const setCategories = useCategoryStore((state) => state.setCategories);

  const [error, setError] = useState<boolean>(false);

  const getCategoriesWithSubs = async () => {
    if (error) setError(false);
    const apiQuery: ApiQuery = { hasSub: true, langCode: locale };
    const response = await getCategories(apiQuery);
    if (!response.success) setError(true);
    return response;
  };

  const config: SWRConfiguration = {
    refreshInterval: 100000,
    revalidateOnFocus: false,
  };

  const { data: categoriesWithSubsData, isValidating: loading } = useSWR<
    ApiResponse<List<Category>>,
    ResponseError
  >(categorySwrKey(locale), getCategoriesWithSubs, config);

  useEffect(() => {
    setCategories({
      error,
      loading,
      data: categoriesWithSubsData?.data.items ?? [],
    });
  }, [loading, error, categoriesWithSubsData]);
};

export default useGetCategories;
