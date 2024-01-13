import React from "react";
import HeaderBottom from "./Bottom";
import HeaderTop from "./Top";
import { useLang, useNotDisplay } from "@/hooks";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const { lang } = useLang();

  const notDisplay = useNotDisplay();

  if (notDisplay) return <React.Fragment></React.Fragment>;

  return (
    <div className="header">
      <HeaderTop lang={lang} />
      <HeaderBottom lang={lang} />
    </div>
  );
};

export default Header;
