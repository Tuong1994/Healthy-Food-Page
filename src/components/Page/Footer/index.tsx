import React from "react";
import { useNotDisplay } from "@/hooks";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  const notDisplay = useNotDisplay();

  if (notDisplay) return <React.Fragment></React.Fragment>;

  return (
    <div className="footer">
      <FooterTop />
      <FooterBottom />
    </div>
  );
};

export default Footer;
