import React from "react";
import { UI } from "@/components";
import { ModalProps } from "@/components/UI/Modal";
import { useLang } from "@/hooks";

const { Modal, Typography } = UI;

const { Paragraph } = Typography;

interface RedirectModalProps extends ModalProps {}

const RedirectModal: React.FC<RedirectModalProps> = ({ ...restProps }) => {
  const { lang } = useLang();

  const modalDefaultProps: ModalProps = {
    color: "green",
    sizes: "sm",
    hasHead: false,
    backdropClose: false,
    okButtonTitle: lang.pageComponent.auth.relogin,
    cancelButtonTitle: lang.pageComponent.auth.logout,
    cancelButtonProps: { color: "green", ghost: true },
    ...restProps,
  };

  return (
    <Modal {...modalDefaultProps}>
      <Paragraph>{lang.pageComponent.auth.note}</Paragraph>
    </Modal>
  );
};

export default RedirectModal;
