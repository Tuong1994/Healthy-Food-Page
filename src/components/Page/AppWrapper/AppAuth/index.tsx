import React from "react";
import { useRouter } from "next/router";
import { logout, refresh } from "@/services/auth/api";
import RedirectModal from "./RedirectModal";
import useAuthStore from "@/store/AuthStore";
import url from "@/common/constant/url";

const { HOME, AUTH_SIGN_IN } = url;

interface AppAuthProps {
  children?: React.ReactNode;
}

const AppAuth: React.FC<AppAuthProps> = ({ children }) => {
  const [auth, resetAuth] = useAuthStore((state) => [state.auth, state.resetAuth]);

  const [open, setOpen] = React.useState<boolean>(false);

  const router = useRouter();

  const { isAuth, info, expired } = auth;

  let interval: any;

  const onRefresh = React.useCallback(async () => {
    setOpen(false);
    const response = await refresh({ customerId: info.id });
    if (!response.success) setOpen(true);
  }, [isAuth]);

  const onLogout = React.useCallback(async () => {
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

  React.useEffect(() => {
    onRefresh();
  }, []);

  React.useEffect(() => {
    if (!isAuth) return;
    const time = expired - Date.now() - 500;
    interval = setInterval(() => onRefresh(), time);
    return () => clearInterval(interval);
  });

  return (
    <React.Fragment>
      {children}
      <RedirectModal open={open} onOk={handleReLogin} onCancel={handleReturn} />
    </React.Fragment>
  );
};

export default AppAuth;
