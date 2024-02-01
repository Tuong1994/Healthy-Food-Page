import { FC, Fragment, ReactNode } from "react";
import { Space, Button, Card } from "@/components/UI";
import { BiArrowBack } from "react-icons/bi";
import type { Lang } from "@/common/type";

interface CustomerEditProps {
  lang: Lang;
  children?: ReactNode;
  handleCloseEdit: () => void;
}

const CustomerEdit: FC<CustomerEditProps> = ({ lang, children, handleCloseEdit }) => {
  return (
    <Fragment>
      <Button text onClick={handleCloseEdit}>
        <Space align="middle">
          <BiArrowBack />
          <span>{lang.customer.form.return}</span>
        </Space>
      </Button>
      <Card>{children}</Card>
    </Fragment>
  );
};

export default CustomerEdit;
