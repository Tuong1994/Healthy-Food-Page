import { ReactNode } from "react";

export type MenuItem = {
  id: string;
  isRoot: boolean;
  label: ReactNode | ReactNode[];
  icon?: ReactNode | ReactNode[];
  children?: MenuItem[];
};

export type MenuItems = MenuItem[];
