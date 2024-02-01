import { Badge } from "@/components/UI";
import { ERecievedType } from "@/services/order/enum";
import { Lang } from "@/common/type";

const getDisplayRecievedType = (lang: Lang, type: ERecievedType) => {
  const recievedTypes: Record<number, string> = {
    [ERecievedType.STORE]: lang.options.recievedType.store,
    [ERecievedType.DELIVERY]: lang.options.recievedType.delivery,
  };

  const colors: Record<number, any> = {
    [ERecievedType.STORE]: "blue",
    [ERecievedType.DELIVERY]: "green",
  };

  return (
    <Badge shape="square" color={colors[type]}>
      {recievedTypes[type]}
    </Badge>
  );
};

export default getDisplayRecievedType;
