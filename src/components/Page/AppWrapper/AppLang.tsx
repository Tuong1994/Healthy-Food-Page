import { FC, ReactNode, Fragment, useEffect } from "react";
import { useRouter } from "next/router";
import { useLang } from "@/hooks";

interface AppLangProps {
  children?: ReactNode;
}

const AppLang: FC<AppLangProps> = ({ children }) => {
  const { locale } = useLang();

  const router = useRouter();

  useEffect(() => {
    const { pathname, query } = router;
    const updatedQuery = { ...query, langCode: locale };
    const isDynamicRoute = /\[.+\]/.test(pathname);
    if (!query.langCode && !isDynamicRoute) router.replace({ pathname, query: updatedQuery });
  }, [locale, router.pathname, router.query.langCode]);

  return <Fragment>{children}</Fragment>;
};

export default AppLang;
