import { FC, ReactNode } from "react";
import { useLang } from "@/hooks";
import Drawer, { DrawerProps } from "@/components/UI/Drawer";

interface UserFormMobileProps extends DrawerProps {
  children?: ReactNode;
}

const UserFormMobile: FC<UserFormMobileProps> = ({ children, ...restProps }) => {
  const { lang } = useLang();

  const drawerDefaultProps: DrawerProps = { head: lang.user.form.title, full: true, ...restProps };

  return <Drawer {...drawerDefaultProps}>{children}</Drawer>;
};

export default UserFormMobile;
