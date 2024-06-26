import { ReactNode, FC, useEffect } from "react";
import { Poppins } from "next/font/google";
import { ToastMessage } from "@/components/UI";
import { useNotDisplay } from "@/hooks";
import Router, { useRouter } from "next/router";
import NProgress from "nprogress";
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

interface AppMainProps {
  children: ReactNode;
}

const AppMain: FC<AppMainProps> = ({ children }) => {
  const setPreviousPath = usePathnameStore((state) => state.setPreviousPath);

  const router = useRouter();

  const notDisplay = useNotDisplay();

  const { asPath, pathname } = router;

  const fullScreenClassName = notDisplay ? "main-full" : "";

  const className = utils.formatClassName("main", fullScreenClassName, poppins.className);

  // Persist previous visted page
  useEffect(() => {
    if (!pathname?.includes("auth")) setPreviousPath(asPath);
  }, [asPath, pathname]);

  // Show progress bar when navigate through router
  useEffect(() => {
    const start = () => NProgress.start();
    const done = () => NProgress.done();

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", done);
    Router.events.on("routeChangeError", done);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", done);
      Router.events.off("routeChangeError", done);
    };
  }, []);

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

export default AppMain;
