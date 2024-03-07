import { useState } from "react";
import { NextPage } from "next";
import { useAsync, useLang } from "@/hooks";
import { forgotPassword } from "@/services/auth/api";
import type { AuthForgotPassword } from "@/services/auth/type";
import type { ApiQuery } from "@/services/type";
import FormLayout from "@/components/Page/FormLayout";
import ForgotPasswordForm from "@/features/auth/ForgotPasswordForm";
import ForgotPasswordMessage from "@/features/auth/ForgotPasswordMessage";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const ForgotPassword: NextPage = () => {
  const messageApi = useMessage();

  const { locale, lang } = useLang();

  const { loading, call: submit } = useAsync(forgotPassword);

  const [isSent, setIsSent] = useState<boolean>(false);

  const initialData: AuthForgotPassword = {
    email: "",
  };

  const handleSubmit = async (data: AuthForgotPassword) => {
    setIsSent(false);
    const apiQuery: ApiQuery = { langCode: locale };
    const response = await submit(apiQuery, data);
    if (!response.success) return messageApi.error(lang.common.message.error.api);
    setIsSent(true);
  };

  const renderContent = () => {
    if (!isSent) return <ForgotPasswordForm loading={loading} />;
    return <ForgotPasswordMessage />;
  };

  return (
    <FormLayout<AuthForgotPassword>
      submitting={loading}
      initialData={initialData}
      formTitle={lang.auth.forgotPassword.title}
      onFinish={handleSubmit}
    >
      {renderContent()}
    </FormLayout>
  );
};

export default ForgotPassword;
