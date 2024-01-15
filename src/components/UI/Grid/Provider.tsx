import React from "react";
import { useViewpoint } from "@/hooks";
import { GridAppContext, GridRowContext } from "./Context";

const GridProvider = ({ children }: { children: React.ReactNode }) => {
  const { isPhone, isTablet, isLaptop, isDesktop, screenWidth } = useViewpoint();
  return (
    <GridAppContext.Provider value={{ isPhone, isTablet, isLaptop, isDesktop, screenWidth }}>
      {children}
    </GridAppContext.Provider>
  );
};

export default GridProvider;

export const useAppGrid = () => React.useContext(GridAppContext)

export const useAppGridRow = () => React.useContext(GridRowContext)