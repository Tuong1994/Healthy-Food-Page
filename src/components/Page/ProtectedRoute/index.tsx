import { FC, Fragment, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import { useLang } from "@/hooks";
import useAuthStore from "@/store/AuthStore";
import url from "@/common/constant/url";

const { AUTH_SIGN_IN } = url;

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const { push: routerPush } = useRouter();

  const { locale } = useLang();

  const auth = useAuthStore((state) => state.auth);

  const { isAuth } = auth;

  useEffect(() => {
    if (!isAuth) routerPush({ pathname: AUTH_SIGN_IN, query: { langCode: locale } });
  }, [isAuth]);

  return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
