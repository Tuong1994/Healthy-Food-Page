import { FC, ReactNode, Fragment, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { logout, refresh } from "@/services/auth/api";
import RedirectModal from "./RedirectModal";
import useAuthStore from "@/store/AuthStore";
import useCartStore from "@/store/CartStore";
import url from "@/common/constant/url";

const { HOME, AUTH_SIGN_IN } = url;

interface AppAuthProps {
  children?: ReactNode;
}

const AppAuth: FC<AppAuthProps> = ({ children }) => {
  const [auth, resetAuth] = useAuthStore((state) => [state.auth, state.resetAuth]);

  const resetCart = useCartStore((state) => state.resetCart);

  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);

  const [reLogin, setReLogin] = useState<boolean>(false);

  const { isAuth, info, expired } = auth;

  const onRefresh = useCallback(async () => {
    setOpen(false);
    const response = await refresh({ userId: info.id });
    if (!response.success) setOpen(true);
  }, [isAuth]);

  const onLogout = useCallback(async () => {
    if (!isAuth) return;
    await logout({ userId: info.id });
    resetAuth();
    resetCart();
  }, [isAuth]);

  const handleReLogin = async () => {
    setOpen(false);
    setReLogin(true);
    await onLogout();
    router.push(AUTH_SIGN_IN);
  };

  const handleReturn = async () => {
    setOpen(false);
    setReLogin(false);
    await onLogout();
    router.push(HOME);
  };

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

  return (
    <Fragment>
      {children}
      <RedirectModal open={open} onOk={handleReLogin} onCancel={handleReturn} />
    </Fragment>
  );
};

export default AppAuth;
