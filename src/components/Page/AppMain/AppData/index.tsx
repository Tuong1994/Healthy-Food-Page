import { ReactNode, FC, Fragment } from "react";
import useGetCategories from "./hooks/useGetCategories";
import useGetCart from "./hooks/useGetCart";

interface AppDataProps {
  children?: ReactNode;
}

const AppData: FC<AppDataProps> = ({ children }) => {
  useGetCategories();

  useGetCart();

  return <Fragment>{children}</Fragment>;
};

export default AppData;
