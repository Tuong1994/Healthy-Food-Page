import { NextPage } from "next";
import { Card, Space, Button, Typography } from "@/components/UI";
import { Form, FormItem, Input, InputPassword } from "@/components/Control";
import type { Auth, AuthSignIn } from "@/services/auth/type";
import { signIn } from "@/services/auth/api";
import { HiLockClosed } from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { useAsync, useLang, useRule } from "@/hooks";
import { useRouter } from "next/router";
import { HttpStatus } from "@/services/axios";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import useAuthStore from "@/store/AuthStore";
import AuthHeader from "@/features/auth/AuthHeader";
import AuthBack from "@/features/auth/AuthBack";
import AuthNote from "@/features/auth/AuthNote";
import Link from "next/link";
import url from "@/common/constant/url";

const { AUTH_SIGN_UP, HOME } = url;

const { Title } = Typography;

const SignIn: NextPage = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const { loading, call: submit } = useAsync<Auth>(signIn);

  const { email, password } = useRule();

  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);

  const initialData: AuthSignIn = {
    email: "",
    password: "",
  };

  const handleSubmit = async (formData: AuthSignIn) => {
    const response = await submit(formData);
    if (!response.success) {
      const status = response.error?.status;
      let message = lang.common.message.error.api;
      if (status === HttpStatus.NOT_FOUND) message = lang.common.message.error.authEmail;
      if (status === HttpStatus.FORBIDDEN) message = lang.common.message.error.authPassword;
      return messageApi.error(message);
    }
    setAuth(response.data);
    messageApi.success(lang.common.message.success.signIn);
    setTimeout(() => router.push(HOME), 200);
  };

  return (
    <div className="sign-in">
      <AuthHeader />
      <div className="sign-in-wrap">
        <AuthBack lang={lang} />

        <Card
          head={
            <Title level={2} rootClassName="wrap-title">
              {lang.auth.signIn.title}
            </Title>
          }
          bodyClassName="wrap-form"
        >
          <Form<AuthSignIn> color="green" sizes="lg" initialData={initialData} onFinish={handleSubmit}>
            <FormItem name="email" rules={email()}>
              <Input label={lang.common.form.label.email} addonBefore={<HiMail />} />
            </FormItem>
            <FormItem name="password" rules={password()}>
              <InputPassword label={lang.common.form.label.password} addonBefore={<HiLockClosed />} />
            </FormItem>

            <Space justify="end">
              <span className="form-link">{lang.auth.signIn.forgot}?</span>
            </Space>

            <div className="form-actions">
              <Button rootClassName="actions-btn" loading={loading}>
                {lang.auth.signIn.title}
              </Button>
              <Link href={AUTH_SIGN_UP}>
                <Button rootClassName="actions-btn" ghost>
                  {lang.auth.signUp.title}
                </Button>
              </Link>
            </div>
          </Form>
        </Card>

        <AuthNote lang={lang} />
      </div>
    </div>
  );
};

export default SignIn;
