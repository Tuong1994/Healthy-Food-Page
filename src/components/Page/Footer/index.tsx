import { FC } from "react";
import { useNotDisplay } from "@/hooks";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";

interface FooterProps {}

const Footer: FC<FooterProps> = () => {
  const notDisplay = useNotDisplay();

  if (notDisplay) return null;

  return (
    <div className="footer">
      <FooterTop />
      <FooterBottom />
    </div>
  );
};

export default Footer;
