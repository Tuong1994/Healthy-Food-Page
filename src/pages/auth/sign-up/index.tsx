import { NextPage } from "next";
import { Space, Card, Button, Typography } from "@/components/UI";
import { Form, FormItem, Input, InputPhone, InputPassword } from "@/components/Control";
import type { AuthInfo, AuthSignIn, AuthSignUp } from "@/services/auth/type";
import { signIn, signUp } from "@/services/auth/api";
import { HiLockClosed, HiPhone } from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { useAsync, useLang, useRule } from "@/hooks";
import { useRouter } from "next/router";
import { HttpStatus } from "@/services/axios";
import useAuthStore from "@/store/AuthStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import AuthHeader from "@/features/auth/AuthHeader";
import AuthBack from "@/features/auth/AuthBack";
import AuthNote from "@/features/auth/AuthNote";
import Link from "next/link";
import url from "@/common/constant/url";

const { HOME, AUTH_SIGN_IN } = url;

const { Title, Paragraph } = Typography;

const SignUp: NextPage = () => {
  const { lang } = useLang();

  const { email, phone, password } = useRule();

  const { loading, call: onSubmit } = useAsync<AuthInfo>(signUp);

  const setAuth = useAuthStore((state) => state.setAuth);

  const messageApi = useMessage();

  const router = useRouter();

  const initialData: AuthSignUp = {
    email: "",
    password: "",
    phone: "",
  };

  const handleSubmit = async (formData: AuthSignUp) => {
    const response = await onSubmit(formData);
    if (!response.success) {
      const status = response.error?.status;
      let message = lang.common.message.error.api;
      if (status === HttpStatus.FORBIDDEN) message = lang.common.message.error.emailExist;
      return messageApi.error(message);
    }
    const signInData: AuthSignIn = { email: formData.email, password: formData.password };
    const signInResponse = await signIn(signInData);
    setAuth(signInResponse.data);
    messageApi.success(lang.common.message.success.signUp);
    setTimeout(() => router.push(HOME), 200);
  };

  return (
    <div className="sign-up">
      <AuthHeader />
      <div className="sign-up-wrap">
        <AuthBack lang={lang} />

        <Card
          head={
            <Title level={2} rootClassName="wrap-title">
              {lang.auth.signUp.title}
            </Title>
          }
          bodyClassName="wrap-form"
        >
          <Form<AuthSignUp> color="green" sizes="lg" initialData={initialData} onFinish={handleSubmit}>
            <FormItem name="email" rules={email()}>
              <Input label={lang.common.form.label.email} addonBefore={<HiMail />} />
            </FormItem>
            <FormItem name="password" rules={password()}>
              <InputPassword label={lang.common.form.label.password} addonBefore={<HiLockClosed />} />
            </FormItem>
            <FormItem name="phone" rules={phone()}>
              <InputPhone label={lang.common.form.label.phone} addonBefore={<HiPhone />} />
            </FormItem>

            <div className="form-actions">
              <Button loading={loading} rootClassName="actions-btn">
                {lang.auth.signUp.title}
              </Button>
            </div>

            <Space rootClassName="form-note" align="middle" justify="center">
              <Paragraph>{lang.auth.signUp.note} ?</Paragraph>
              <span>|</span>
              <Link href={AUTH_SIGN_IN} className="note-link">
                {lang.auth.signIn.title}
              </Link>
            </Space>
          </Form>
        </Card>

        <AuthNote lang={lang} />
      </div>
    </div>
  );
};

export default SignUp;
