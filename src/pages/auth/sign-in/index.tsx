import { NextPage } from "next";
import { UI, Control } from "@/components";
import { HiLockClosed } from "react-icons/hi2";
import { HiMail } from "react-icons/hi";
import { useLang } from "@/hooks";
import AuthHeader from "@/components/Page/Auth/AuthHeader";
import AuthBack from "@/components/Page/Auth/AuthBack";
import AuthNote from "@/components/Page/Auth/AuthNote";
import Link from "next/link";
import url from "@/common/constant/url";

const { AUTH_SIGN_UP } = url;

const { Card, Space, Button, Typography } = UI;

const { Title } = Typography;

const { Form, FormItem, Input, InputPassword } = Control;

interface FormData {
  email: string;
  password: string;
}

const SignIn: NextPage = () => {
  const { lang } = useLang();

  const initialData: FormData = {
    email: "",
    password: "",
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
          <Form<FormData> color="green" sizes="lg" initialData={initialData}>
            <FormItem name="email">
              <Input
                label={lang.common.form.label.email}
                addonBefore={<HiMail />}
              />
            </FormItem>
            <FormItem name="password">
              <InputPassword
                label={lang.common.form.label.password}
                addonBefore={<HiLockClosed />}
              />
            </FormItem>

            <Space justify="end">
              <span className="form-link">{lang.auth.signIn.forgot}?</span>
            </Space>

            <div className="form-actions">
              <Button rootClassName="actions-btn">
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
