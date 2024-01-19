import React from "react";
import { UI, Control } from "@/components";
import { ModalProps } from "@/components/UI/Modal";
import { useLang } from "@/hooks";

const { Modal, Typography } = UI;

const { Paragraph } = Typography;

const { Form, FormItem, Input, TextArea } = Control;

interface FormData {
  name: string;
  phone: string;
  email: string;
  address: string;
}

interface ShipmentModalProps extends ModalProps {}

const ShipmentModal: React.FC<ShipmentModalProps> = ({ ...restProps }) => {
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
