import { useCallback, useEffect, useState } from "react";
import { refresh } from "@/services/auth/api";
import useAuthStore from "@/store/AuthStore";

const useRefreshToken = () => {
  const [auth, setAuth] = useAuthStore((state) => [state.auth, state.setAuth]);

  const [open, setOpen] = useState<boolean>(false);

  const [reLogin, setReLogin] = useState<boolean>(false);

  const { isAuth, expired } = auth;

  const onRefresh = useCallback(async () => {
    setOpen(false);
    const response = await refresh();
    if (!response.success) return setOpen(true);
    setAuth({ ...auth, ...response.data });
  }, [isAuth]);

  // Refresh token when first access page
  useEffect(() => {
    if (isAuth) onRefresh();
  }, []);

  // Refresh token interval
  useEffect(() => {
    if (!isAuth) return;

    const expiredTime = expired ?? 0;
    if (expiredTime < Date.now()) return;

    let interval: any;
    const time = expiredTime - Date.now() - 500;
    interval = setInterval(() => {
      if (!reLogin) onRefresh();
    }, time);
    return () => clearInterval(interval);
  }, []);

  return { open, reLogin, setOpen, setReLogin };
};

export default useRefreshToken;
