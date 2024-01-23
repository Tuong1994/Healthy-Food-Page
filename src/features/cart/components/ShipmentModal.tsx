import { Dispatch, FC, SetStateAction } from "react";
import { Modal, Typography } from "@/components/UI";
import { Form, FormItem, Input, InputPhone } from "@/components/Control";
import { useLang, useRule } from "@/hooks";
import type { ModalProps } from "@/components/UI/Modal";
import type { ShipmentFormData } from "@/services/shipment/type";
import useFormStore from "@/components/Control/Form/FormStore";

const { Paragraph } = Typography;

interface ShipmentModalProps extends ModalProps {
  defaultData: ShipmentFormData | undefined;
  onFinish: (formData: ShipmentFormData | undefined) => void;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const ShipmentModal: FC<ShipmentModalProps> = ({ onFinish, setOpenModal, defaultData, ...restProps }) => {
  const { lang } = useLang();

  const { common, phone, email } = useRule();

  const form = useFormStore((state) => state.form);

  const modalDefaultProps: ModalProps = {
    sizes: "sm",
    color: "green",
    hasCloseIcon: defaultData === undefined,
    backdropClose: false,
    hasCancelButton: false,
    onOk: form?.handleSubmit,
    okButtonTitle: lang.common.actions.save,
    head: (
      <Paragraph size={16} weight={600}>
        {lang.cart.shipment.title}
      </Paragraph>
    ),
    ...restProps,
  };

  const initialData: ShipmentFormData = {
    fullName: defaultData ? defaultData.fullName : "",
    phone: defaultData ? defaultData.phone : "",
    email: defaultData ? defaultData.email : "",
    address: defaultData ? defaultData.address : "",
  };

  const handleFinish = (formData: ShipmentFormData) => {
    onFinish(formData);
    setOpenModal(false);
  };

  return (
    <Modal {...modalDefaultProps}>
      <Form<ShipmentFormData> initialData={initialData} onFinish={handleFinish}>
        <FormItem name="fullName" rules={common()}>
          <Input label={lang.common.form.label.fullName} />
        </FormItem>
        <FormItem name="phone" rules={phone()}>
          <InputPhone label={lang.common.form.label.phone} />
        </FormItem>
        <FormItem name="email" rules={email()}>
          <Input label={lang.common.form.label.email} />
        </FormItem>
        <FormItem name="address" rules={common()}>
          <Input label={lang.common.form.label.fullAddress} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default ShipmentModal;
