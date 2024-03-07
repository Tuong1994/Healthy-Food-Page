import { usePathname } from "next/navigation";

const useNotDisplay = () => {
  const pathname = usePathname();
  if (pathname?.includes("auth") || pathname?.includes("contact")) return true;
  return false;
};

export default useNotDisplay;
