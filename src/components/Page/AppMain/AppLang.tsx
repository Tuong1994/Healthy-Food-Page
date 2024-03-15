import { FC, ReactNode, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { useLang } from "@/hooks";

interface AppLangProps {
  children?: ReactNode;
}

const AppLang: FC<AppLangProps> = ({ children }) => {
  const { locale, handleSwitchLang } = useLang();

  const router = useRouter();

  const { pathname, query, replace: routerReplace } = router;

  useEffect(() => {
    if (sessionStorage && sessionStorage.getItem("locale")) {
      const defaultLocale = JSON.parse(sessionStorage.getItem("locale") ?? "");
      handleSwitchLang(defaultLocale);
    }
  }, []);

  useEffect(() => {
    const updatedQuery = { ...query, langCode: locale };
    const isDynamicRoute = /\[.+\]/.test(pathname);
    if (!query.langCode && !isDynamicRoute) routerReplace({ pathname, query: updatedQuery });
  }, [locale, pathname, query.langCode]);

  return <Fragment>{children}</Fragment>;
};

export default AppLang;
