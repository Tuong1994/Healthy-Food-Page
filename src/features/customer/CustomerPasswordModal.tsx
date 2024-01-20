import { FC } from "react";
import { Modal } from "@/components/UI";
import { Form, FormItem, InputPassword } from "@/components/Control";
import type { ModalProps } from "@/components/UI/Modal";
import type { Lang } from "@/common/type";

interface FormData {
  oldPassword: string;
  newPassword: string;
}

interface CustomerPasswordModalProps extends ModalProps {
  lang: Lang;
}

const CustomerPasswordModal: FC<CustomerPasswordModalProps> = ({ lang, ...restProps }) => {
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
