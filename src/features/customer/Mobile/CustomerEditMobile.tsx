import { FC } from "react";
import { useLang } from "@/hooks";
import type { Customer } from "@/services/customer/type";
import Drawer, { DrawerProps } from "@/components/UI/Drawer";
import CustomerForm from "../CustomerForm";

interface CustomerFormMobileProps extends DrawerProps {
  customer: Customer;
  handleOpenPassword: () => void;
}

const CustomerFormMobile: FC<CustomerFormMobileProps> = ({ customer, handleOpenPassword, ...restProps }) => {
  const { lang } = useLang();

  const drawerDefaultProps: DrawerProps = { head: lang.customer.form.title, full: true, ...restProps };

  return (
    <Drawer {...drawerDefaultProps}>
      <CustomerForm customer={customer} lang={lang} handleOpenPassword={handleOpenPassword} />
    </Drawer>
  );
};

export default CustomerFormMobile;
