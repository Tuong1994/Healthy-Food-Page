import { EProductUnit } from "@/services/product/enum";
import { Badge } from "@/components/UI";
import { useLang } from "@/hooks";

const useDisplayProductUnit = (unit: EProductUnit) => {
  const { lang } = useLang();

  const productUnits: Record<number, string> = {
    [EProductUnit.KG]: lang.options.productUnit.kg,
    [EProductUnit.BIN]: lang.options.productUnit.bin,
    [EProductUnit.BOTTLE]: lang.options.productUnit.bottle,
    [EProductUnit.BOX]: lang.options.productUnit.box,
    [EProductUnit.CAN]: lang.options.productUnit.can,
    [EProductUnit.PACK]: lang.options.productUnit.pack,
    [EProductUnit.PIECE]: lang.options.productUnit.piece,
  };

  return (
    <Badge shape="square" color="green">
      {productUnits[unit]}
    </Badge>
  );
};

export default useDisplayProductUnit;
