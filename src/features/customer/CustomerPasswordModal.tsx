import { FC } from "react";
import { Modal } from "@/components/UI";
import { Form, FormItem, InputPassword } from "@/components/Control";
import type { ModalProps } from "@/components/UI/Modal";
import type { Lang } from "@/common/type";
import type { AuthPassword } from "@/services/auth/type";
import type { ApiQuery } from "@/services/type";
import { changePassword, logout } from "@/services/auth/api";
import { useAsync, useRule } from "@/hooks";
import { useRouter } from "next/router";
import useFormStore from "@/components/Control/Form/FormStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAuthStore from "@/store/AuthStore";
import url from "@/common/constant/url";

const { AUTH_SIGN_IN } = url;

interface CustomerPasswordModalProps extends ModalProps {
  lang: Lang;
}

const CustomerPasswordModal: FC<CustomerPasswordModalProps> = ({ lang, onCancel, ...restProps }) => {
  const form = useFormStore((state) => state.form);

  const resetAuth = useAuthStore((state) => state.resetAuth);

  const messageApi = useMessage();

  const { password } = useRule();

  const { query, push: routerPush } = useRouter();

  const { loading, call: onChangePassword } = useAsync(changePassword);

  const modalDefaultProps: ModalProps = {
    color: "green",
    sizes: "sm",
    head: lang.customer.form.action,
    okButtonTitle: lang.common.actions.save,
    okButtonProps: { loading },
    onOk: form?.handleSubmit,
    onCancel,
    ...restProps,
  };

  const initialData: AuthPassword = {
    oldPassword: "",
    newPassword: "",
  };

  const handleSubmit = async (formData: AuthPassword) => {
    const apiQuery: ApiQuery = { customerId: query.id as string };
    const response = await onChangePassword(apiQuery, formData);
    if (!response.success) return messageApi.error(lang.common.message.error.api);
    const logoutResponse = await logout(apiQuery);
    if (!logoutResponse.success) return messageApi.error(lang.common.message.error.api);
    resetAuth();
    onCancel?.();
    setTimeout(() => routerPush(AUTH_SIGN_IN), 200);
    messageApi.success(lang.common.message.success.changePassword);
  };

  return (
    <Modal {...modalDefaultProps}>
      <Form<AuthPassword> initialData={initialData} onFinish={handleSubmit}>
        <FormItem name="oldPassword" rules={password()}>
          <InputPassword required label={lang.common.form.label.oldPassword} />
        </FormItem>
        <FormItem name="newPassword" rules={password()}>
          <InputPassword required label={lang.common.form.label.newPassword} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default CustomerPasswordModal;
