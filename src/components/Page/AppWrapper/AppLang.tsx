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
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, langCode: locale },
    });
  }, [locale, router.pathname]);

  return <Fragment>{children}</Fragment>;
};

export default AppLang;
