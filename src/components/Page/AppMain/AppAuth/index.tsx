import { FC, ReactNode, Fragment, useCallback } from "react";
import { useRouter } from "next/router";
import { logout } from "@/services/auth/api";
import RedirectModal from "./RedirectModal";
import useAuthStore from "@/store/AuthStore";
import useCartStore from "@/store/CartStore";
import useRefreshToken from "./hooks/useRefreshToken";
import url from "@/common/constant/url";

const { HOME, AUTH_SIGN_IN } = url;

interface AppAuthProps {
  children?: ReactNode;
}

const AppAuth: FC<AppAuthProps> = ({ children }) => {
  const [auth, resetAuth] = useAuthStore((state) => [state.auth, state.resetAuth]);

  const resetCart = useCartStore((state) => state.resetCart);

  const router = useRouter();

  const { isAuth, info } = auth;

  const { open, setOpen, setReLogin } = useRefreshToken();

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

  return (
    <Fragment>
      {children}
      <RedirectModal open={open} onOk={handleReLogin} onCancel={handleReturn} />
    </Fragment>
  );
};

export default AppAuth;
