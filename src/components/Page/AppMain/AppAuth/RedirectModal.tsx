import { FC } from "react";
import { Modal, Typography } from "@/components/UI";
import { useLang } from "@/hooks";
import type { ModalProps } from "@/components/UI/Modal";

const { Paragraph } = Typography;

interface RedirectModalProps extends ModalProps {}

const RedirectModal: FC<RedirectModalProps> = ({ ...restProps }) => {
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
