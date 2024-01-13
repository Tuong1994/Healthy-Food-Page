import { Badge } from "@/components/UI";
import { EOrderStatus } from "@/services/order/enum";
import { useLang } from "@/hooks";

const useDisplayOrderStatus = (status: EOrderStatus) => {
  const { lang } = useLang();

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

export default useDisplayOrderStatus;
