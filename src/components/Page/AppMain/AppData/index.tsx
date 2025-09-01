import { ReactNode, FC, Fragment } from "react";
import useGetCategories from "./hooks/useGetCategories";
import useGetCart from "./hooks/useGetCart";
import useGetOAuthInfo from "./hooks/useGetOAuthInfo";

interface AppDataProps {
  children?: ReactNode;
}

const AppData: FC<AppDataProps> = ({ children }) => {
  useGetCategories();

  useGetCart();

  useGetOAuthInfo();

  return <Fragment>{children}</Fragment>;
};

export default AppData;
