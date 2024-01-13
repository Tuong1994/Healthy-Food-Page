import { NextPage } from "next";
import { UI, Control } from "@/components";
import { HiLockClosed, HiPhone, HiUser } from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { useLang } from "@/hooks";
import AuthHeader from "@/components/Page/Auth/AuthHeader";
import AuthBack from "@/components/Page/Auth/AuthBack";
import AuthNote from "@/components/Page/Auth/AuthNote";
import Link from "next/link";
import url from "@/common/constant/url";

const { AUTH_SIGN_IN } = url;

const { Space, Card, Button, Typography } = UI;

const { Title, Paragraph } = Typography;

const { Form, FormItem, Input, InputPassword } = Control;

interface FormData {
  account: string;
  password: string;
  phone: string;
  email: string;
}

const SignUp: NextPage = () => {
  const { lang } = useLang();

  const initialData: FormData = {
    account: "",
    password: "",
    phone: "",
    email: "",
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
          <Form<FormData> color="green" sizes="lg" initialData={initialData}>
            <FormItem name="account">
              <Input label={lang.common.form.label.account} addonBefore={<HiUser />} />
            </FormItem>
            <FormItem name="password">
              <InputPassword label={lang.common.form.label.password} addonBefore={<HiLockClosed />} />
            </FormItem>
            <FormItem name="phone">
              <Input label={lang.common.form.label.phone} addonBefore={<HiPhone />} />
            </FormItem>
            <FormItem name="email">
              <Input label={lang.common.form.label.email} addonBefore={<HiMail />} />
            </FormItem>

            <div className="form-actions">
              <Button rootClassName="actions-btn">{lang.auth.signUp.title}</Button>
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