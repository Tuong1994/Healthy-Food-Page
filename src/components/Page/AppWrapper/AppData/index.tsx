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
  const { type } = useLang();

  const getCategoriesWithSubs = async () => {
    const response = await getCategories({ hasSub: true, langCode: type });
    return response;
  };

  const {
    data: categoriesWithSubsData,
    isValidating: categoriesWithSubsLoading,
    error: categoriesWithSubsError,
  } = useSWR<ApiResponse<List<Category>>, ResponseError>(
    `getCategoriesWithSubs?type=${type}`,
    getCategoriesWithSubs
  );

  const appData: AppDataState = {
    categoriesWithSubsResponse: {
      loading: categoriesWithSubsLoading,
      error: categoriesWithSubsError !== undefined,
      data: categoriesWithSubsData?.data.items ?? [],
    },
  };

  return <AppDataProiver data={appData}>{children}</AppDataProiver>;
};

export default AppData;
