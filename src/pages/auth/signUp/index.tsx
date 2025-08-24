import { NextPage } from "next";
import { Space, Button, Typography } from "@/components/UI";
import { FormItem, Input, InputPhone, InputPassword } from "@/components/Control";
import { signIn, signUp } from "@/services/auth/api";
import { HiLockClosed, HiPhone } from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { useAsync, useLang, useRule } from "@/hooks";
import { useRouter } from "next/router";
import { HttpStatus } from "@/services/axios";
import type { AuthInfo, AuthSignIn, AuthSignUp } from "@/services/auth/type";
import FormLayout from "@/components/Page/FormLayout";
import Link from "next/link";
import useAuthStore from "@/store/AuthStore";
import usePathnameStore from "@/store/PathnameStore";
import useMessage from "@/components/UI/ToastMessage/useMessage";
import url from "@/common/constant/url";

const { AUTH_SIGN_IN } = url;

const { Paragraph } = Typography;

const SignUp: NextPage = () => {
  const messageApi = useMessage();

  const { lang } = useLang();

  const { common, email, phone, password } = useRule();

  const { loading, call: onSubmit } = useAsync<AuthInfo>(signUp);

  const router = useRouter();

  const setAuth = useAuthStore((state) => state.setAuth);

  const previousPath = usePathnameStore((state) => state.previousPath);

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
    setTimeout(() => router.push(previousPath), 200);
  };

  return (
    <FormLayout<AuthSignUp>
      rootClassName="sign-up"
      sizes="lg"
      submitting={loading}
      initialData={initialData}
      formTitle={lang.auth.signUp.title}
      onFinish={handleSubmit}
    >
      <FormItem name="email" rules={email()}>
        <Input required label={lang.common.form.label.email} addonBefore={<HiMail />} />
      </FormItem>
      <FormItem name="password" rules={password()}>
        <InputPassword required label={lang.common.form.label.password} addonBefore={<HiLockClosed />} />
      </FormItem>
      <FormItem name="phone" rules={phone().concat(common())}>
        <InputPhone required label={lang.common.form.label.phone} addonBefore={<HiPhone />} />
      </FormItem>

      <div className="sign-up-actions">
        <Button loading={loading} rootClassName="actions-btn">
          {lang.auth.signUp.title}
        </Button>
      </div>

      <Space rootClassName="sign-up-note" align="middle" justify="center">
        <Paragraph>{lang.auth.signUp.note} ?</Paragraph>
        <span>|</span>
        <Link href={AUTH_SIGN_IN} className="note-link">
          {lang.auth.signIn.title}
        </Link>
      </Space>
    </FormLayout>
  );
};

export default SignUp;
