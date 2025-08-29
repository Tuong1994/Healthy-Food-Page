import { FC } from "react";
import { Button, Grid } from "@/components/UI";
import type { Lang } from "@/common/type";
import type { OrderFormData } from "@/services/order/type";

const { Row, Col } = Grid;

interface PaymentActionsProps {
  lang: Lang;
  loading: boolean;
  order: OrderFormData;
  handleUnConfirm: () => void;
  handleOrder: () => void;
}

const PaymentActions: FC<PaymentActionsProps> = ({ lang, order, loading, handleUnConfirm, handleOrder }) => {
  const disabledPayment = order.paymentMethod === -1;

  return (
    <div className="payment-actions">
      <Row justify="between">
        <Col xs={8} md={6} lg={8} span={6}>
          <Button sizes="lg" color="green" ghost rootClassName="actions-btn" onClick={handleUnConfirm}>
            {lang.cart.actions.return}
          </Button>
        </Col>
        <Col xs={16} md={18} lg={16} span={18} onClick={handleOrder}>
          <Button
            sizes="lg"
            color="green"
            rootClassName="actions-btn"
            loading={loading}
            disabled={disabledPayment || loading}
          >
            {lang.cart.actions.purchase}
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default PaymentActions;
