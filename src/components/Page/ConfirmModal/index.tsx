import { FC, ReactNode } from "react";
import { Modal } from "@/components/UI";
import type { ModalProps } from "@/components/UI/Modal";

interface ConfirmModalProps extends ModalProps {
  desciption?: ReactNode;
}

const ConfirmModal: FC<ConfirmModalProps> = ({ desciption, ...restProps }) => {
  const modalDefaultProps: ModalProps = {
    sizes: "sm",
    color: "green",
    hasHead: false,
    cancelButtonProps: { color: "green", ghost: true },
    ...restProps,
  };

  return <Modal {...modalDefaultProps}>{desciption}</Modal>;
};

export default ConfirmModal;
