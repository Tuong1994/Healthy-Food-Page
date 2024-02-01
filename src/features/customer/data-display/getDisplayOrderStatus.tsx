import { Badge } from "@/components/UI";
import { EOrderStatus } from "@/services/order/enum";
import { Lang } from "@/common/type";

const getDisplayOrderStatus = (lang: Lang, status: EOrderStatus) => {
  const orderStatuses: Record<number, string> = {
    [EOrderStatus.DELIVERING]: lang.options.orderStatus.delivering,
    [EOrderStatus.DELIVERED]: lang.options.orderStatus.delivered,
  };

  const colors: Record<number, any> = {
    [EOrderStatus.DELIVERED]: "blue",
    [EOrderStatus.DELIVERING]: "orange",
  };

  return (
    <Badge shape="square" color={colors[status]}>
      {orderStatuses[status]}
    </Badge>
  );
};

export default getDisplayOrderStatus;
