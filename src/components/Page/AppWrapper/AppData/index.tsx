import React from "react";
import { useLang } from "@/hooks";
import { getCategories } from "@/services/category/api";
import { Category } from "@/services/category/type";
import { ApiResponse, List, ResponseError } from "@/services/type";
import { getCart } from "@/services/cart/api";
import { Cart } from "@/services/cart/type";
import AppDataProiver, { AppDataState } from "./Provider";
import useAuthStore from "@/store/AuthStore";
import useSWR, { SWRConfiguration } from "swr";
import useCartStore from "@/store/CartStore";

interface AppDataProps {
  children?: React.ReactNode;
}

const AppData: React.FC<AppDataProps> = ({ children }) => {
  const { locale } = useLang();

  const auth = useAuthStore((state) => state.auth);

  const setCart = useCartStore((state) => state.setCart);

  const [categoriesWithSubsError, setCategoriesWithSubsError] = React.useState<boolean>(false);

  const [cartByCustomerError, setCartByCustomerError] = React.useState<boolean>(false);

  const getCategoriesWithSubs = async () => {
    setCategoriesWithSubsError(false);
    const response = await getCategories({ hasSub: true, langCode: locale });
    if (!response.success) setCategoriesWithSubsError(true);
    return response;
  };

  const getCartByCustomer = async () => {
    setCartByCustomerError(false);
    const response = await getCart({ customerId: auth.info.id, langCode: locale });
    if (!response.success) setCartByCustomerError(true);
    if (response.success) setCart(response.data);
    return response;
  };

  const config: SWRConfiguration = {
    refreshInterval: 100000,
    revalidateOnFocus: false,
  };

  const { data: categoriesWithSubsData, isValidating: categoriesWithSubsLoading } = useSWR<
    ApiResponse<List<Category>>,
    ResponseError
  >(`getCategoriesWithSubs?locale=${locale}`, getCategoriesWithSubs, config);

  const { data: cartByCustomerData, isValidating: cartByCustomerLoading } = useSWR<
    ApiResponse<Cart>,
    ResponseError
  >(
    auth.isAuth ? `getCartByCustomer?customerId=${auth.info.id}&langCode=${locale}` : null,
    getCartByCustomer,
    config
  );

  const appData: AppDataState = {
    categoriesWithSubsResponse: {
      loading: categoriesWithSubsLoading,
      error: categoriesWithSubsError,
      data: categoriesWithSubsData?.data.items ?? [],
    },
    cartByCustomerResponse: {
      loading: cartByCustomerLoading,
      error: cartByCustomerError,
      data: cartByCustomerData?.data,
    },
  };

  return <AppDataProiver data={appData}>{children}</AppDataProiver>;
};

export default AppData;
