import { NextPage } from "next";
import { Space, Button, Image, Divider } from "@/components/UI";
import { FormItem, Input, InputPassword } from "@/components/Control";
import { signIn } from "@/services/auth/api";
import { HiLockClosed } from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { useAsync, useLang, useRule } from "@/hooks";
import { useRouter } from "next/router";
import { HttpStatus } from "@/services/axios";
import type { Auth, AuthSignIn } from "@/services/auth/type";
import FormLayout from "@/components/Page/FormLayout";
import Link from "next/link";
import useAuthStore from "@/store/AuthStore";
import usePathnameStore from "@/store/PathnameStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import url from "@/common/constant/url";

const { AUTH_SIGN_UP, AUTH_FORGOT_PASSWORD } = url;

const SignIn: NextPage = () => {
  const messageApi = useMessage();

  const { locale, lang } = useLang();

  const { loading, call: submit } = useAsync<Auth>(signIn);

  const { email, password } = useRule();

  const router = useRouter();

  const previousPath = usePathnameStore((state) => state.previousPath);

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
    setTimeout(() => router.push(previousPath), 200);
  };

  return (
    <FormLayout<AuthSignIn>
      rootClassName="sign-in"
      sizes="lg"
      submitting={loading}
      initialData={initialData}
      formTitle={lang.auth.signIn.title}
      onFinish={handleSubmit}
    >
      <FormItem name="email" rules={email()}>
        <Input required label={lang.common.form.label.email} addonBefore={<HiMail />} />
      </FormItem>
      <FormItem name="password" rules={password()}>
        <InputPassword required label={lang.common.form.label.password} addonBefore={<HiLockClosed />} />
      </FormItem>

      <Space justify="end">
        <Link href={{ pathname: AUTH_FORGOT_PASSWORD, query: { langCode: locale } }} className="sign-in-link">
          {lang.auth.signIn.forgot}?
        </Link>
      </Space>

      <div className="sign-in-actions">
        <Button rootClassName="actions-btn" loading={loading}>
          {lang.auth.signIn.title}
        </Button>
        <Link href={AUTH_SIGN_UP}>
          <Button rootClassName="actions-btn" ghost>
            {lang.auth.signUp.title}
          </Button>
        </Link>
      </div>

      <Divider placement="center">{lang.auth.signIn.dividerContent}</Divider>

      <div className="sign-in-actions">
        <Button ghost rootClassName="actions-btn">
          <Space align="middle">
            <Image imgWidth={30} imgHeight={30} src="/google/google-logo.svg" />
            <span>{lang.auth.signIn.thirdParty} Google</span>
          </Space>
        </Button>
      </div>
    </FormLayout>
  );
};

export default SignIn;
