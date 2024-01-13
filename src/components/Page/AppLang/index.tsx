import React from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface AppLangProps {
  children?: React.ReactNode;
}

const AppLang: React.FC<AppLangProps> = ({ children }) => {
  const searchParams = useSearchParams()

  return <React.Fragment>{children}</React.Fragment>;
};

export default AppLang;
