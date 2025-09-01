import { useEffect } from "react";
import { getOAuthInfo } from "@/services/auth/api";
import useAuthStore from "@/store/AuthStore";

const useGetOAuthInfo = () => {
  const auth = useAuthStore((state) => state.auth);

  const { isAuth } = auth;

  const getInfo = async () => {
    await getOAuthInfo();
  };

  useEffect(() => {
    if (isAuth) getInfo();
  }, [isAuth]);
};

export default useGetOAuthInfo;
