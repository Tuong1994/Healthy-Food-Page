import { Badge } from "@/components/UI";
import { EPaymentStatus } from "@/services/order/enum";
import { useLang } from "@/hooks";

const useDisplayPaymentStatus = (status: EPaymentStatus) => {
  const { lang } = useLang();

  const paymentStatuses: Record<number, string> = {
    [EPaymentStatus.WAITTING]: lang.options.paymentStatus.waitting,
    [EPaymentStatus.PAID]: lang.options.paymentStatus.paid,
    [EPaymentStatus.UNPAID]: lang.options.paymentStatus.unPaid,
  };

  const colors: Record<number, any> = {
    [EPaymentStatus.WAITTING]: "orange",
    [EPaymentStatus.PAID]: "blue",
    [EPaymentStatus.UNPAID]: "red",
  };

  return (
    <Badge shape="square" color={colors[status]}>
      {paymentStatuses[status]}
    </Badge>
  );
};

export default useDisplayPaymentStatus;
