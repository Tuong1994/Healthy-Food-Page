import { useEffect, useState } from "react";
import { getCart } from "@/services/cart/api";
import { CartWithItemsPaging } from "@/services/cart/type";
import { ApiQuery, ApiResponse, ResponseError } from "@/services/type";
import { useLang } from "@/hooks";
import { useRouter } from "next/router";
import { cartSwrKey } from "../swrkey";
import useSWR, { SWRConfiguration } from "swr";
import useAuthStore from "@/store/AuthStore";
import useCartStore from "@/store/CartStore";

const useGetCart = () => {
  const { locale } = useLang();

  const { query } = useRouter();

  const auth = useAuthStore((state) => state.auth);

  const [setCart, setQuickCart] = useCartStore((state) => [state.setCart, state.setQuickCart]);

  const [error, setError] = useState<boolean>(false);

  const { page, limit } = query;

  const queryPage = page ? Number(page) : undefined;

  const queryLimit = limit ? Number(limit) : undefined;

  const getCartByUser = async () => {
    const apiQuery: ApiQuery = {
      page: queryPage,
      limit: queryLimit,
      userId: auth.info.id,
      langCode: locale,
    };
    if (error) setError(false);
    const response = await getCart(apiQuery);
    if (!response.success) setError(true);
    return response;
  };

  const config: SWRConfiguration = {
    refreshInterval: 0,
    revalidateOnFocus: false,
  };

  const { data: cartByUserData, isValidating: loading } = useSWR<
    ApiResponse<CartWithItemsPaging>,
    ResponseError
  >(auth.isAuth ? cartSwrKey(auth.info?.id, query.page, query.limit, locale) : null, getCartByUser, config);

  useEffect(() => {
    const data = { loading, error, data: cartByUserData?.data };
    if (!queryPage && !queryLimit) setQuickCart(data);
    setCart(data);
  }, [queryPage, queryLimit, loading, error, cartByUserData]);
};

export default useGetCart;
