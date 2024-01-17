import { EProductOrigin } from "@/services/product/enum";
import { Badge } from "@/components/UI";
import { useLang } from "@/hooks";

const useDisplayProductOrigin = (origin: EProductOrigin) => {
  const { lang } = useLang();

  const productOrigins: Record<number, string> = {
    [EProductOrigin.VN]: lang.options.productOrigin.vn,
  };

  const colors: Record<number, any> = {
    [EProductOrigin.VN]: "red",
  };

  return (
    <Badge shape="square" color={colors[origin]}>
      {productOrigins[origin]}
    </Badge>
  );
};

export default useDisplayProductOrigin;
