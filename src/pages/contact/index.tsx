import { useState } from "react";
import { NextPage } from "next";
import { useAsync, useLang } from "@/hooks";
import { emailContact } from "@/services/email/api";
import type { EmailContact } from "@/services/email/type";
import type { ApiQuery } from "@/services/type";
import FormLayout from "@/components/Page/FormLayout";
import ContactForm from "@/features/contact/ContactForm";
import ContactMessage from "@/features/contact/ContactMessage";
import useMessage from "@/components/UI/ToastMessage/useMessage";

const Contact: NextPage = () => {
  const messageApi = useMessage();

  const { locale, lang } = useLang();

  const { loading, call: onEmailContact } = useAsync(emailContact);

  const [isSend, setIsSend] = useState<boolean>(false);

  const initialData: EmailContact = {
    fullName: "",
    phone: "",
    email: "",
  };

  const handleSubmit = async (data: EmailContact) => {
    const apiQuery: ApiQuery = { langCode: locale };
    const response = await onEmailContact(apiQuery, data);
    if (!response.success) return messageApi.error(lang.common.message.error.api);
    setIsSend(true);
  };

  const renderContent = () => {
    if (!isSend) return <ContactForm loading={loading} lang={lang} />;
    return <ContactMessage lang={lang} />;
  };

  return (
    <FormLayout<EmailContact>
      rootClassName="contact"
      submitting={loading}
      formTitle={lang.contact.title}
      initialData={initialData}
      onFinish={handleSubmit}
    >
      {renderContent()}
    </FormLayout>
  );
};

export default Contact;
