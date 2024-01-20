import { FC } from "react";
import { Modal, Typography } from "@/components/UI";
import { Form, FormItem, Input } from "@/components/Control";
import { useLang } from "@/hooks";
import type { ModalProps } from "@/components/UI/Modal";

const { Paragraph } = Typography;

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface ShipmentModalProps extends ModalProps {}

const ShipmentModal: FC<ShipmentModalProps> = ({ ...restProps }) => {
  const { lang } = useLang();

  const initialData: FormData = {
    name: "",
    phone: "",
    email: "",
    address: "",
  };

  return (
    <Modal
      {...restProps}
      color="green"
      sizes="sm"
      okButtonTitle={lang.common.actions.save}
      head={
        <Paragraph size={16} weight={600}>
          {lang.cart.shipment.title}
        </Paragraph>
      }
    >
      <Form<FormData> initialData={initialData}>
        <FormItem name="name">
          <Input label={lang.common.form.label.fullName} />
        </FormItem>
        <FormItem name="phone">
          <Input label={lang.common.form.label.phone} />
        </FormItem>
        <FormItem name="email">
          <Input label={lang.common.form.label.email} />
        </FormItem>
        <FormItem name="address">
          <Input label={lang.common.form.label.fullAddress} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default ShipmentModal;
