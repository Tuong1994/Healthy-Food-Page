import { useEffect } from "react";
import { getOAuthInfo } from "@/services/auth/api";
import useAuthStore from "@/store/AuthStore";

const useGetOAuthInfo = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  const getInfo = async () => {
    const response = await getOAuthInfo();
    if (!response.success) return;
    setAuth(response.data);
  };

  useEffect(() => {
    getInfo();
  }, []);
};

export default useGetOAuthInfo;
