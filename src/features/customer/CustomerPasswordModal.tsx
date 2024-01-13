import React from "react";
import { UI, Control } from "@/components";
import type { ModalProps } from "@/components/UI/Modal";
import type { Lang } from "@/common/type";

const { Modal } = UI;

const { Form, FormItem, InputPassword } = Control;

interface FormData {
  oldPassword: string;
  newPassword: string;
}

interface CustomerPasswordModalProps extends ModalProps {
  lang: Lang;
}

const CustomerPasswordModal: React.FC<CustomerPasswordModalProps> = ({ lang, ...restProps }) => {
  const initialData: FormData = {
    oldPassword: "",
    newPassword: "",
  };

  return (
    <Modal color="green" sizes="sm" {...restProps}>
      <Form<FormData> initialData={initialData}>
        <FormItem name="oldPassword">
          <InputPassword required label={lang.common.form.label.oldPassword} />
        </FormItem>
        <FormItem name="newPassword">
          <InputPassword required label={lang.common.form.label.newPassword} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CustomerPasswordModal;
