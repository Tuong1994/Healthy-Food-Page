import { FC, Fragment, ReactNode } from "react";
import { Space, Button, Card } from "@/components/UI";
import { BiArrowBack } from "react-icons/bi";
import type { Lang } from "@/common/type";

interface UserEditProps {
  lang: Lang;
  children?: ReactNode;
  handleCloseEdit: () => void;
}

const UserEdit: FC<UserEditProps> = ({ lang, children, handleCloseEdit }) => {
  return (
    <Fragment>
      <Button text onClick={handleCloseEdit}>
        <Space align="middle">
          <BiArrowBack />
          <span>{lang.user.form.return}</span>
        </Space>
      </Button>
      <Card>{children}</Card>
    </Fragment>
  );
};

export default UserEdit;
