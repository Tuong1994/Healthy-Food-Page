import { FC, Fragment } from "react";
import { Button } from "@/components/UI";
import { FormItem, Input, InputPhone } from "@/components/Control";
import { HiMail, HiPhone, HiUser } from "react-icons/hi";
import { useRule } from "@/hooks";
import type { Lang } from "@/common/type";

interface ContactFormProps {
  loading: boolean;
  lang: Lang;
}

const ContactForm: FC<ContactFormProps> = ({ loading, lang }) => {
  const { common, phone, email } = useRule();

  return (
    <Fragment>
      <FormItem name="fullName" rules={common()}>
        <Input required label={lang.common.form.label.fullName} addonBefore={<HiUser />} />
      </FormItem>
      <FormItem name="phone" rules={phone().concat(common())}>
        <InputPhone required label={lang.common.form.label.phone} addonBefore={<HiPhone />} />
      </FormItem>
      <FormItem name="email" rules={email()}>
        <Input required label={lang.common.form.label.email} addonBefore={<HiMail />} />
      </FormItem>

      <Button ghost color="green" loading={loading} rootClassName="contact-action">
        {lang.common.actions.send}
      </Button>
    </Fragment>
  );
};

export default ContactForm;
