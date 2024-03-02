import { Lang } from "@/common/type";
import { Paragraph } from "@/components/UI/Typography";
import { FC, Fragment } from "react";

interface ContactMessageProps {
  lang: Lang;
}

const ContactMessage: FC<ContactMessageProps> = ({ lang }) => {
  return (
    <Fragment>
      <Paragraph align="center" size={16} variant="success">
        {lang.contact.message}
      </Paragraph>
    </Fragment>
  );
};

export default ContactMessage;
