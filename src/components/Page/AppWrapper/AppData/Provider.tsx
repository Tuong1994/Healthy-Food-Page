import React from "react";
import { CategoriesWithSubsResponse } from "./type";

export interface AppDataState {
  categoriesWithSubsResponse: CategoriesWithSubsResponse;
}

const AppDataContext = React.createContext<AppDataState>({
  categoriesWithSubsResponse: {
    error: false,
    loading: false,
    data: [],
  },
});

const AppDataProiver = ({ children, data }: { children?: React.ReactNode; data: AppDataState }) => {
  return <AppDataContext.Provider value={data}>{children}</AppDataContext.Provider>;
};

export default AppDataProiver;

export const useAppData = () => React.useContext(AppDataContext);

export const useCategoriesData = () => {
  const { categoriesWithSubsResponse } = React.useContext(AppDataContext);
  const { data, loading, error } = categoriesWithSubsResponse;
  return { data, loading, error };
};
