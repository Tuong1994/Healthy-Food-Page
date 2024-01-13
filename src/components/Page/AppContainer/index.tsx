import React from "react";
import { useNotDisplay } from "@/hooks";
import Header from "../Header";
import Footer from "../Footer";
import FooterMobile from "@/components/Mobile/FooterMobile";
import GridProvider from "@/components/UI/Grid/Provider";
import AppLang from "../AppLang";
import { Poppins } from "next/font/google";
import utils from "@/utils";

const poppins = Poppins({
  weight: ["100", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface AppContainerProps {
  children: React.ReactNode;
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
  const notDisplay = useNotDisplay();

  const fullScreenClassName = notDisplay ? "main-full" : "";

  const className = utils.formatClassName(
    "main",
    fullScreenClassName,
    poppins.className
  );

  return (
    <GridProvider>
      <AppLang>
        <Header />
        <main className={className}>
          <React.Fragment>{children}</React.Fragment>
        </main>
        <Footer />
        <FooterMobile />
        <div id="portal"></div>
      </AppLang>
    </GridProvider>
  );
};

export default AppContainer;
