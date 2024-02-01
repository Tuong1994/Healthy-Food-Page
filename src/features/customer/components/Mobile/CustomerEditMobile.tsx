import { FC, ReactNode } from "react";
import { useLang } from "@/hooks";
import Drawer, { DrawerProps } from "@/components/UI/Drawer";

interface CustomerFormMobileProps extends DrawerProps {
  children?: ReactNode;
}

const CustomerFormMobile: FC<CustomerFormMobileProps> = ({ children, ...restProps }) => {
  const { lang } = useLang();

  const drawerDefaultProps: DrawerProps = { head: lang.customer.form.title, full: true, ...restProps };

  return <Drawer {...drawerDefaultProps}>{children}</Drawer>;
};

export default CustomerFormMobile;
