import React from "react";
import { useLang } from "@/hooks";
import { getCategories } from "@/services/category/api";
import { Category } from "@/services/category/type";
import { ApiResponse, List, ResponseError } from "@/services/type";
import AppDataProiver, { AppDataState } from "./Provider";
import useSWR from "swr";

interface AppDataProps {
  children?: React.ReactNode;
}

const AppData: React.FC<AppDataProps> = ({ children }) => {
  const { locale } = useLang();

  const [categoriesWithSubsError, setCategoriesWithSubsError] = React.useState<boolean>(false);

  const getCategoriesWithSubs = async () => {
    setCategoriesWithSubsError(false);
    const response = await getCategories({ hasSub: true, langCode: locale });
    if (!response.success) setCategoriesWithSubsError(true);
    return response;
  };

  const { data: categoriesWithSubsData, isValidating: categoriesWithSubsLoading } = useSWR<
    ApiResponse<List<Category>>,
    ResponseError
  >(`getCategoriesWithSubs?locale=${locale}`, getCategoriesWithSubs, {
    refreshInterval: 10000,
  });

  const appData: AppDataState = {
    categoriesWithSubsResponse: {
      loading: categoriesWithSubsLoading,
      error: categoriesWithSubsError,
      data: categoriesWithSubsData?.data.items ?? [],
    },
  };

  return <AppDataProiver data={appData}>{children}</AppDataProiver>;
};

export default AppData;
