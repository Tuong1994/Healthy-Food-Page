import { createContext, ReactNode, useContext } from "react";
import { CartByCustomerResponse, CategoriesWithSubsResponse } from "./type";

export interface AppDataState {
  categoriesWithSubsResponse: CategoriesWithSubsResponse;
  cartByCustomerResponse: CartByCustomerResponse;
}

const AppDataContext = createContext<AppDataState>({
  categoriesWithSubsResponse: {
    error: false,
    loading: false,
    data: [],
  },
  cartByCustomerResponse: {
    error: false,
    loading: false,
    data: undefined,
  },
});

const AppDataProiver = ({ children, data }: { children?: ReactNode; data: AppDataState }) => {
  return <AppDataContext.Provider value={data}>{children}</AppDataContext.Provider>;
};

export default AppDataProiver;

export const useAppData = () => useContext(AppDataContext);

export const useCategoriesData = () => {
  const { categoriesWithSubsResponse } = useContext(AppDataContext);
  const { data, loading, error } = categoriesWithSubsResponse;
  return { data, loading, error };
};
