import { usePathname } from "next/navigation";
import url from "@/common/constant/url";

const { AUTH_SIGN_IN, AUTH_SIGN_UP } = url;

const useNotDisplay = () => {
  const pathname = usePathname();
  if (pathname === AUTH_SIGN_IN || pathname === AUTH_SIGN_UP) return true;
  return false;
};

export default useNotDisplay;
