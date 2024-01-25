import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { Breadcrumb, Tabs, Grid } from "@/components/UI";
import type { BreadcrumbItems } from "@/components/UI/Breadcrumb/type";
import type { TabsItems } from "@/components/UI/Tabs/type";
import type { ApiQuery, ApiResponse } from "@/services/type";
import type { Customer } from "@/services/customer/type";
import { getCustomer } from "@/services/customer/api";
import { ELang } from "@/common/enum";
import { useAppGrid } from "@/components/UI/Grid/Provider";
import { useLang, useMounted } from "@/hooks";
import Link from "next/link";
import CustomerInfo from "@/features/customer/CustomerInfo";
import CustomerOrder from "@/features/customer/CustomerOrder";
import CustomerComment from "@/features/customer/CustomerComment";
import CustomerRate from "@/features/customer/CustomerRate";
import CustomerEdit from "@/features/customer/CustomerEdit";
import CustomerEditMobile from "@/features/customer/Mobile/CustomerEditMobile";
import CustomerForm from "@/features/customer/CustomerForm";
import CustomerPasswordModal from "@/features/customer/CustomerPasswordModal";
import NoDataError from "@/components/Page/Error/NoDataError";
import url from "@/common/constant/url";

const { HOME } = url;

const { Row, Col } = Grid;

interface CustomerProps {
  customerResponse: ApiResponse<Customer>;
}

const Customer: NextPage<CustomerProps> = ({ customerResponse }) => {
  const { lang } = useLang();

  const { isPhone } = useAppGrid();

  const isMounted = useMounted();

  const [selectedTab, setSelectedTab] = useState<string>("order");

  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [isMobileEdit, setIsMobileEdit] = useState<boolean>(false);

  const [openPassword, setOpenPassword] = useState<boolean>(false);

  const { success, data: customer } = customerResponse;

  const items: BreadcrumbItems = [
    { id: "1", label: <Link href={HOME}>{lang.common.menu.home}</Link> },
    { id: "2", label: "User name", actived: true },
  ];

  const tabs: TabsItems = [
    { id: "order", title: lang.customer.order.title, content: <CustomerOrder selectedTab={selectedTab} /> },
    {
      id: "comment",
      title: lang.customer.comment.title,
      content: <CustomerComment lang={lang} selectedTab={selectedTab} />,
    },
    {
      id: "rate",
      title: lang.customer.rate.title,
      content: <CustomerRate lang={lang} selectedTab={selectedTab} />,
    },
  ];

  const handleSelectTab = (id: string) => setSelectedTab(id);

  const handleEdit = () => (!isPhone ? setIsEdit(!isEdit) : setIsMobileEdit(!isMobileEdit));

  const handlePassword = () => setOpenPassword(!openPassword);

  const renderContent = () => {
    if (!success) return <NoDataError />;
    return (
      <Row justify="between">
        <Col xs={24} md={24} lg={8} span={8}>
          <CustomerInfo lang={lang} customer={customer} handleOpenEdit={handleEdit} />
        </Col>
        <Col xs={24} md={24} lg={16} span={16}>
          {!isEdit ? (
            <Tabs color="green" items={tabs} onSelectTab={handleSelectTab} />
          ) : (
            !isPhone && (
              <CustomerEdit lang={lang} handleCloseEdit={handleEdit}>
                <CustomerForm customer={customer} lang={lang} handleOpenPassword={handlePassword} />
              </CustomerEdit>
            )
          )}
          {isPhone && (
            <CustomerEditMobile
              open={isMobileEdit}
              customer={customer}
              handleOpenPassword={handlePassword}
              onClose={handleEdit}
            />
          )}
        </Col>
      </Row>
    );
  };

  if (!isMounted) return null;

  return (
    <div className="page customer">
      <Breadcrumb items={items} />
      {renderContent()}
      <CustomerPasswordModal lang={lang} open={openPassword} onCancel={handlePassword} />
    </div>
  );
};

export default Customer;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;
  const apiQuery: ApiQuery = { customerId: query.id as string, langCode: query.langCode as ELang };
  const customerResponse = await getCustomer(apiQuery);
  return {
    props: {
      customerResponse,
    },
  };
};
