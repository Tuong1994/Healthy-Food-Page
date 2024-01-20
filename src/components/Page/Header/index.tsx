import { FC } from "react";
import { useLang, useNotDisplay } from "@/hooks";
import HeaderBottom from "./Bottom";
import HeaderTop from "./Top";

interface HeaderProps {}

const Header: FC<HeaderProps> = () => {
  const { lang } = useLang();

  const notDisplay = useNotDisplay();

  if (notDisplay) return null;

  return (
    <div className="header">
      <HeaderTop lang={lang} />
      <HeaderBottom lang={lang} />
    </div>
  );
};

export default Header;
