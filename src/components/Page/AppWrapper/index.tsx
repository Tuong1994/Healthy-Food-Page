import { ReactNode, FC, useEffect } from "react";
import { Poppins } from "next/font/google";
import { ToastMessage } from "@/components/UI";
import { useNotDisplay } from "@/hooks";
import { useRouter } from "next/router";
import usePathnameStore from "@/store/PathnameStore";
import Header from "../Header";
import Footer from "../Footer";
import FooterMobile from "@/components/Mobile/FooterMobile";
import GridProvider from "@/components/UI/Grid/Provider";
import ScrollUpButton from "../ScrollUpButton";
import AppLang from "./AppLang";
import AppData from "./AppData";
import AppAuth from "./AppAuth";
import utils from "@/utils";

const poppins = Poppins({
  weight: ["100", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

interface AppWarpperProps {
  children: ReactNode;
}

const AppWarpper: FC<AppWarpperProps> = ({ children }) => {
  const setPreviousPath = usePathnameStore((state) => state.setPreviousPath);

  const router = useRouter();

  const notDisplay = useNotDisplay();

  const fullScreenClassName = notDisplay ? "main-full" : "";

  const className = utils.formatClassName("main", fullScreenClassName, poppins.className);

  // Persist previous visted page
  useEffect(() => {
    if (!router.pathname?.includes("auth")) setPreviousPath(router.asPath);
  }, [router.asPath, router.pathname]);

  return (
    <GridProvider>
      <AppLang>
        <AppAuth>
          <AppData>
            <Header />
            <main className={className}>{children}</main>
            <Footer />
            <FooterMobile />
            <ToastMessage />
            <ScrollUpButton />
            <div id="portal"></div>
          </AppData>
        </AppAuth>
      </AppLang>
    </GridProvider>
  );
};

export default AppWarpper;
