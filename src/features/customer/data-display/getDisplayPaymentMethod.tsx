import { Badge } from "@/components/UI";
import { EPaymentMethod } from "@/services/order/enum";
import { Lang } from "@/common/type";

const getDisplayPaymentMethod = (lang: Lang, method: EPaymentMethod) => {
  const paymentMethods: Record<number, string> = {
    [EPaymentMethod.TRANSFER]: lang.options.paymentMethod.transfer,
    [EPaymentMethod.COD]: lang.options.paymentMethod.cod,
    [EPaymentMethod.CASH]: lang.options.paymentMethod.cash,
  };

  const colors: Record<number, any> = {
    [EPaymentMethod.TRANSFER]: "blue",
    [EPaymentMethod.COD]: "purple",
    [EPaymentMethod.CASH]: "green",
  };

  return (
    <Badge shape="square" ghost color={colors[method]}>
      {paymentMethods[method]}
    </Badge>
  );
};

export default getDisplayPaymentMethod;
