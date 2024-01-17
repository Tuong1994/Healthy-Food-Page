import React from "react";
import { useRouter } from "next/router";
import { useLang } from "@/hooks";

interface AppLangProps {
  children?: React.ReactNode;
}

const AppLang: React.FC<AppLangProps> = ({ children }) => {
  const { locale } = useLang();

  const router = useRouter();

  React.useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, langCode: locale },
    });
  }, [locale, router.pathname]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default AppLang;
