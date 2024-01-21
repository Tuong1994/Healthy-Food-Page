import { useEffect, useState } from "react";
import { getCart } from "@/services/cart/api";
import { CartWithItemsPaging } from "@/services/cart/type";
import { ApiQuery, ApiResponse, ResponseError } from "@/services/type";
import { useLang } from "@/hooks";
import { useRouter } from "next/router";
import useSWR, { SWRConfiguration } from "swr";
import useAuthStore from "@/store/AuthStore";
import useCartStore from "@/store/CartStore";

const useGetCart = () => {
  const { locale } = useLang();

  const { query } = useRouter();

  const auth = useAuthStore((state) => state.auth);

  const setCart = useCartStore((state) => state.setCart);

  const [error, setError] = useState<boolean>(false);

  const getCartByCustomer = async () => {
    setError(false);
    const { page, limit } = query;
    const apiQuery: ApiQuery = {
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 10,
      customerId: auth.info.id,
      langCode: locale,
    };
    const response = await getCart(apiQuery);
    if (!response.success) setError(true);
    return response;
  };

  const config: SWRConfiguration = {
    refreshInterval: 100000,
    revalidateOnFocus: false,
  };

  const { data: cartByCustomerData, isValidating: loading } = useSWR<
    ApiResponse<CartWithItemsPaging>,
    ResponseError
  >(
    auth.isAuth
      ? `getCartByCustomer?customerId=${auth.info.id}&page=${query.page}&limit=${query.limit}`
      : null,
    getCartByCustomer,
    config
  );

  useEffect(() => {
    setCart({
      loading,
      error,
      data: cartByCustomerData?.data,
    });
  }, [loading]);
};

export default useGetCart;
