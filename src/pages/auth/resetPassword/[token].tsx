import { NextPage } from "next";
import { useParams } from "next/navigation";
import { FormItem, InputPassword } from "@/components/Control";
import { Button } from "@/components/UI";
import { useAsync, useLang, useRule } from "@/hooks";
import { resetPassword } from "@/services/auth/api";
import { useRouter } from "next/router";
import type { AuthResetPassword } from "@/services/auth/type";
import FormLayout from "@/components/Page/FormLayout";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import url from "@/common/constant/url";

const { AUTH_SIGN_IN, AUTH_FORGOT_PASSWORD } = url;

const ResetPassword: NextPage = () => {
  const messageApi = useMessage();

  const params = useParams();

  const { push: routerPush } = useRouter();

  const { locale, lang } = useLang();

  const { common, match } = useRule();

  const { loading, call: submit } = useAsync(resetPassword);

  const initialData: AuthResetPassword = {
    resetPassword: "",
    confirmPassword: "",
    token: params ? (params.token as string) : "",
  };

  const handleSubmit = async (data: AuthResetPassword) => {
    const prepareData: AuthResetPassword = {
      resetPassword: data.resetPassword,
      token: data.token,
    };
    const response = await submit(prepareData);
    if (!response.success) {
      messageApi.error(lang.common.message.error.api);
      return routerPush({ pathname: AUTH_FORGOT_PASSWORD, query: { langCode: locale } });
    }
    messageApi.success(lang.common.message.success.resetPassword);
    routerPush({ pathname: AUTH_SIGN_IN, query: { langCode: locale } });
  };

  return (
    <FormLayout<AuthResetPassword>
      submitting={loading}
      initialData={initialData}
      formTitle={lang.auth.resetPassword.title}
      onFinish={handleSubmit}
    >
      <FormItem name="resetPassword" rules={common()}>
        <InputPassword required label={lang.common.form.label.newPassword} />
      </FormItem>
      <FormItem name="confirmPassword">
        <InputPassword required label={lang.common.form.label.confirmPassword} />
      </FormItem>
      <Button loading={loading}>{lang.auth.resetPassword.action}</Button>
    </FormLayout>
  );
};

export default ResetPassword;
