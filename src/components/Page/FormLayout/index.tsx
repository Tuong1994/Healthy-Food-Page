import { ReactNode } from "react";
import { Card, Typography } from "@/components/UI";
import { Form } from "@/components/Control";
import { useLang } from "@/hooks";
import type { FormProps } from "@/components/Control/Form";
import FormLayoutHeader from "./FormLayoutHeader";
import FormLayoutBack from "./FormLayoutBack";
import FormLayoutNote from "./FormLayoutNote";
import utils from "@/utils";

const { Title } = Typography;

interface FormLayoutProps<M> extends FormProps<M> {
  formTitle?: string;
  rootClassName?: string;
  submitting?: boolean;
  children?: ReactNode;
}

const FormLayout = <M extends object>({
  rootClassName = "",
  formTitle,
  submitting,
  children,
  ...restProps
}: FormLayoutProps<M>) => {
  const { lang } = useLang();

  const formDefaultProps: FormProps<M> = {
    sizes: "lg",
    color: "green",
    disabled: submitting,
    ...restProps,
  };

  const mainClassName = utils.formatClassName("form-layout", rootClassName);

  return (
    <div className={mainClassName}>
      <FormLayoutHeader />
      <div className="form-layout-wrap">
        <FormLayoutBack lang={lang} />
        <Card
          head={
            <Title level={2} rootClassName="wrap-title">
              {formTitle}
            </Title>
          }
          bodyClassName="wrap-form"
        >
          <Form<M> {...formDefaultProps}>{children}</Form>
        </Card>

        <FormLayoutNote lang={lang} />
      </div>
    </div>
  );
};

export default FormLayout;
