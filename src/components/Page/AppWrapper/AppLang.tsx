import React from "react";
import { useRouter } from "next/router";
import { useLang } from "@/hooks";

interface AppLangProps {
  children?: React.ReactNode;
}

const AppLang: React.FC<AppLangProps> = ({ children }) => {
  const { type } = useLang();

  const router = useRouter();

  React.useEffect(() => {
    router.replace({
      pathname: router.pathname,
      query: { ...router.query, locale: type },
    });
  }, [type, router.pathname]);

  return <React.Fragment>{children}</React.Fragment>;
};

export default AppLang;
