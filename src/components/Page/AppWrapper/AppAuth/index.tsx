import { FC, ReactNode, Fragment, useState, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { logout, refresh } from "@/services/auth/api";
import RedirectModal from "./RedirectModal";
import useAuthStore from "@/store/AuthStore";
import url from "@/common/constant/url";

const { HOME, AUTH_SIGN_IN } = url;

interface AppAuthProps {
  children?: ReactNode;
}

const AppAuth: FC<AppAuthProps> = ({ children }) => {
  const [auth, resetAuth] = useAuthStore((state) => [state.auth, state.resetAuth]);

  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const { isAuth, info, expired } = auth;

  let interval: any;

  const onRefresh = useCallback(async () => {
    setOpen(false);
    const response = await refresh({ customerId: info.id });
    if (!response.success) setOpen(true);
  }, [isAuth]);

  const onLogout = useCallback(async () => {
    if (!isAuth) return;
    await logout({ customerId: info.id });
    resetAuth();
  }, [isAuth]);

  const handleReLogin = async () => {
    setOpen(false);
    await onLogout();
    router.push(AUTH_SIGN_IN);
  };

  const handleReturn = async () => {
    setOpen(false);
    await onLogout();
    router.push(HOME);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (!isAuth) return;
    const time = expired - Date.now() - 500;
    interval = setInterval(() => onRefresh(), time);
    return () => clearInterval(interval);
  });

  return (
    <Fragment>
      {children}
      <RedirectModal open={open} onOk={handleReLogin} onCancel={handleReturn} />
    </Fragment>
  );
};

export default AppAuth;
