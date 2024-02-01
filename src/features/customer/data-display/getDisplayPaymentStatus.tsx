import { Badge } from "@/components/UI";
import { EPaymentStatus } from "@/services/order/enum";
import { Lang } from "@/common/type";

const getDisplayPaymentStatus = (lang: Lang, status: EPaymentStatus) => {
  const paymentStatuses: Record<number, string> = {
    [EPaymentStatus.PAID]: lang.options.paymentStatus.paid,
    [EPaymentStatus.UNPAID]: lang.options.paymentStatus.unPaid,
  };

  const colors: Record<number, any> = {
    [EPaymentStatus.PAID]: "blue",
    [EPaymentStatus.UNPAID]: "red",
  };

  return (
    <Badge shape="square" color={colors[status]}>
      {paymentStatuses[status]}
    </Badge>
  );
};

export default getDisplayPaymentStatus;
