import { Badge } from "@/components/UI";
import { EReceivedType } from "@/services/order/enum";
import { Lang } from "@/common/type";

const getDisplayReceivedType = (lang: Lang, type: EReceivedType) => {
  const recievedTypes: Record<number, string> = {
    [EReceivedType.STORE]: lang.options.receivedType.store,
    [EReceivedType.DELIVERY]: lang.options.receivedType.delivery,
  };

  const colors: Record<number, any> = {
    [EReceivedType.STORE]: "blue",
    [EReceivedType.DELIVERY]: "green",
  };

  return (
    <Badge shape="square" color={colors[type]}>
      {recievedTypes[type]}
    </Badge>
  );
};

export default getDisplayReceivedType;
