import React from "react";
import { Poppins } from "next/font/google";
import { ToastMessage } from "@/components/UI";
import { useNotDisplay } from "@/hooks";
import Header from "../Header";
import Footer from "../Footer";
import FooterMobile from "@/components/Mobile/FooterMobile";
import GridProvider from "@/components/UI/Grid/Provider";
import AppLang from "./AppLang";
import AppData from "./AppData";
import AppAuth from "./AppAuth";
import utils from "@/utils";

const poppins = Poppins({
  weight: ["100", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface AppWarpperProps {
  children: React.ReactNode;
}

const AppWarpper: React.FC<AppWarpperProps> = ({ children }) => {
  const notDisplay = useNotDisplay();

  const fullScreenClassName = notDisplay ? "main-full" : "";

  const className = utils.formatClassName("main", fullScreenClassName, poppins.className);

  return (
    <GridProvider>
      <AppLang>
        <AppAuth>
          <AppData>
            <Header />
            <main className={className}>
              <React.Fragment>{children}</React.Fragment>
            </main>
            <Footer />
            <FooterMobile />
            <ToastMessage />
            <div id="portal"></div>
          </AppData>
        </AppAuth>
      </AppLang>
    </GridProvider>
  );
};

export default AppWarpper;
