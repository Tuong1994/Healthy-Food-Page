import { FC, Fragment } from "react";
import { FormItem, Input } from "@/components/Control";
import { Button, Space } from "@/components/UI";
import { useLang, useRule } from "@/hooks";
import Link from "next/link";
import url from "@/common/constant/url";

const { AUTH_SIGN_IN } = url;

interface ForgotPasswordFormProps {
  loading: boolean;
}

const ForgotPasswordForm: FC<ForgotPasswordFormProps> = ({ loading }) => {
  const { locale, lang } = useLang();

  const { email } = useRule();

  return (
    <Fragment>
      <FormItem name="email" rules={email()}>
        <Input required label={lang.common.form.label.email} />
      </FormItem>
      <Space align="middle">
        <Button loading={loading}>{lang.auth.forgotPassword.action}</Button>
        <span>|</span>
        <Link href={{ pathname: AUTH_SIGN_IN, query: { langCode: locale } }} className="form-layout-link">
          {lang.auth.signIn.title}
        </Link>
      </Space>
    </Fragment>
  );
};

export default ForgotPasswordForm;
