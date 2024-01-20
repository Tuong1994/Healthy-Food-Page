import { FC } from "react";
import { Divider, Modal } from "@/components/UI";
import { Form, FormItem, Input, TextArea } from "@/components/Control";
import type { ModalProps } from "@/components/UI/Modal";
import type { Lang } from "@/common/type";
import RateRange from "./RateRange";
import useFormStore from "@/components/Control/Form/FormStore";

type FormData = {
  name: string;
  email: string;
  phone: string;
  note: string;
};

interface RateModalProps extends ModalProps {
  lang: Lang;
}

const RateModal: FC<RateModalProps> = ({ sizes = "sm", color = "green", lang, ...restProps }) => {
  const form = useFormStore((state) => state.form);

  const initialData: FormData = {
    name: "User name",
    phone: "0793229970",
    email: "user@example.com",
    note: "",
  };

  const handleSubmit = () => {};

  return (
    <Modal
      {...restProps}
      head={lang.pageComponent.rate.modalTitle}
      sizes={sizes}
      color={color}
      okButtonProps={{ type: "submit" }}
      onOk={form?.handleSubmit()}
    >
      <RateRange />

      <Divider />

      <Form<FormData> initialData={initialData} onFinish={handleSubmit}>
        <FormItem name="name" disabled>
          <Input label={lang.common.form.label.fullName} />
        </FormItem>
        <FormItem name="phone" disabled>
          <Input label={lang.common.form.label.phone} />
        </FormItem>
        <FormItem name="email" disabled>
          <Input label={lang.common.form.label.email} />
        </FormItem>
        <FormItem name="note">
          <TextArea rows={3} label={lang.common.form.label.note} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default RateModal;
