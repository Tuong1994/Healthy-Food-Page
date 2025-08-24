import { useState, useEffect } from "react";

export const breakpoint = {
  SM_PHONE: 320,
  MD_PHONE: 480,
  LG_PHONE: 576,
  SM_TABLET: 667,
  MD_TABLET: 768,
  LG_TABLET: 992,
  LAPTOP: 1100,
} as const;

const useViewpoint = () => {
  if (typeof window === "undefined")
    return {
      screenWidth: 0,
      isSmPhone: false,
      isPhone: false,
      isLgPhone: false,
      isSmTablet: false,
      isTablet: false,
      isLgTablet: false,
      isLaptop: false,
      isDesktop: false,
    };

  const { SM_PHONE, MD_PHONE, LG_PHONE, SM_TABLET, MD_TABLET, LG_TABLET, LAPTOP } = breakpoint;

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmPhone = screenWidth >= SM_PHONE && screenWidth < MD_PHONE;

  const isPhone = screenWidth >= SM_PHONE && screenWidth <= MD_PHONE;

  const isLgPhone = screenWidth > MD_PHONE && screenWidth <= LG_PHONE;

  const isSmTablet = screenWidth > LG_PHONE && screenWidth <= SM_TABLET;

  const isTablet = screenWidth > MD_PHONE && screenWidth <= MD_TABLET;

  const isLgTablet = screenWidth > MD_TABLET && screenWidth <= LG_TABLET;

  const isLaptop = screenWidth > MD_TABLET && screenWidth <= LAPTOP;

  const isDesktop = screenWidth > LAPTOP;

  return {
    screenWidth,
    isSmPhone,
    isPhone,
    isLgPhone,
    isSmTablet,
    isTablet,
    isLgTablet,
    isLaptop,
    isDesktop,
  };
};

export default useViewpoint;
