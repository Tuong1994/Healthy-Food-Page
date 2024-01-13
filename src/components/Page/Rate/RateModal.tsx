import React from "react";
import { UI, Control } from "@/components";
import { ModalProps } from "@/components/UI/Modal";
import { Lang } from "@/common/type";
import RateRange from "./RateRange";
import useFormStore from "@/components/Control/Form/FormStore";

const { Divider, Modal } = UI;

const { Form, FormItem, Input, TextArea } = Control;

type FormData = {
  name: string;
  email: string;
  phone: string;
  note: string;
};

interface RateModalProps extends ModalProps {
  lang: Lang;
}

const RateModal: React.FC<RateModalProps> = ({ sizes = "sm", color = "green", lang, ...restProps }) => {
  const form = useFormStore((state) => state.form);

  const initialData: FormData = {
    name: "User name",
    phone: "0793229970",
    email: "user@example.com",
    note: "",
  };

  const handleSubmit = () => {
    console.log(form?.handleSubmit());
  };

  return (
    <Modal
      {...restProps}
      head={lang.pageComponent.rate.modalTitle}
      sizes={sizes}
      color={color}
      okButtonProps={{ type: "submit" }}
      onOk={handleSubmit}
    >
      <RateRange />

      <Divider />

      <Form<FormData> initialData={initialData} onFinish={(data) => console.log(data)}>
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
