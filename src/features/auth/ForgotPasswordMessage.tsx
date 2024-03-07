import { FC, Fragment } from "react";
import { useLang } from "@/hooks";
import { Paragraph } from "@/components/UI/Typography";

interface ForgotPasswordMessageProps {}

const ForgotPasswordMessage: FC<ForgotPasswordMessageProps> = () => {
  const { lang } = useLang();

  return (
    <Fragment>
      <Paragraph align="center" size={16} variant="success">
        {lang.auth.forgotPassword.message}
      </Paragraph>
    </Fragment>
  );
};

export default ForgotPasswordMessage;
