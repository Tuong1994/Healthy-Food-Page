import { useLang } from "@/hooks";
import { useEffect, useState } from "react";
import { getCategories } from "@/services/category/api";
import type { ApiResponse, List, ResponseError } from "@/services/type";
import type { Category } from "@/services/category/type";
import useCategoryStore from "@/store/CategoryStore";
import useSWR, { SWRConfiguration } from "swr";

const useGetCategories = () => {
  const { locale } = useLang();

  const setCategories = useCategoryStore((state) => state.setCategories);

  const [error, setError] = useState<boolean>(false);

  const getCategoriesWithSubs = async () => {
    setError(false);
    const response = await getCategories({ hasSub: true, langCode: locale });
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
  >(`getCategoriesWithSubs?locale=${locale}`, getCategoriesWithSubs, config);

  useEffect(() => {
    setCategories({
      error,
      loading,
      data: categoriesWithSubsData?.data.items ?? [],
    });
  }, [loading]);
};

export default useGetCategories;
